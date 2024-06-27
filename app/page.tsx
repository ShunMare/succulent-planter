"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import PlantWithToolTip from "@/app/components/PlantWithToolTip";
import Modal from "@/app/components/Modal";
import SectionSizeSelector from "@/app/components/SectionSizeSelector";
import { PlantData } from "@/data/plantData";
import { plants } from "@/constants/plantDatabase";
import { getMaxCols } from "@/utils/utilities";
import {
  savePlantDataToFirestore,
  fetchPlantDataFromFirestore,
} from "@/libs/firestore/firestoreOperations";
import { plantData as localPlantData } from "@/data/plantData";
import { db, auth, login } from "@/libs/firestore/firebase";
import NurseryPlantSectionWrapper from "@/app/components/NurseryPlantSectionWrapper";
import CombinedPlantSectionWrapper from "@/app/components/CombinedPlantSectionWrapper";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [plantData, setPlantData] = useState<PlantData>({});
  const [combinedPlantData, setCombinedPlantData] = useState<PlantData>({});
  const [originalPlantData, setOriginalPlantData] = useState<PlantData>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(6);
  const [planterType, setPlanterType] = useState("苗植え");

  useEffect(() => {
    const useLocalData = process.env.USE_LOCAL_DATA === "true";

    const fetchData = async () => {
      if (!useLocalData) {
        await login();
        console.log("Fetching data from Firestore...");
        const plantCollectionData = await fetchPlantDataFromFirestore(
          "plantCollection"
        );
        const combinedPlantCollectionData = await fetchPlantDataFromFirestore(
          "combinedPlantCollection"
        );

        console.log("Fetched plantCollectionData:", plantCollectionData);
        console.log(
          "Fetched combinedPlantCollectionData:",
          combinedPlantCollectionData
        );

        setPlantData(plantCollectionData);
        setCombinedPlantData(combinedPlantCollectionData);
        setOriginalPlantData(plantCollectionData);
      } else {
        console.log("Using local data...");
        setPlantData(localPlantData);
        setOriginalPlantData(localPlantData);
      }
    };

    fetchData();
  }, []);

  const getCollectionName = (type: string) => {
    console.log("Determining collection name for type:", type);
    return type === "苗植え" ? "plantCollection" : "combinedPlantCollection";
  };

  const handleUpdatePlantData = (
    sectionIndex: number,
    rowIndex: number,
    plantIndex: number,
    newPlantId: number,
    newDate: string,
    newCuttingType: string,
    newHasLabel: boolean,
    isCombined: boolean = false
  ) => {
    const sectionKey = isCombined
      ? `combinedSection${sectionIndex}`
      : `section${sectionIndex}`;
    const updatedPlantData = isCombined
      ? { ...combinedPlantData }
      : { ...plantData };
    if (updatedPlantData[sectionKey]) {
      const plantToUpdate = updatedPlantData[sectionKey][rowIndex][plantIndex];
      if (!plantToUpdate.uniqueId) {
        plantToUpdate.uniqueId = `${sectionKey}-${rowIndex}-${plantIndex}`;
      }
      plantToUpdate.plantId = newPlantId;
      plantToUpdate.startDate = newDate;
      plantToUpdate.cutType = newCuttingType;
      plantToUpdate.hasLabel = newHasLabel;
      if (isCombined) {
        setCombinedPlantData(updatedPlantData);
      } else {
        setPlantData(updatedPlantData);
      }
    }
  };

  const saveUpdatedPlantData = async (
    updatedData: any,
    newSectionKey?: string,
    isCombined: boolean = false
  ) => {
    try {
      const collectionName = isCombined
        ? "combinedPlantCollection"
        : "plantCollection";
      console.log("Saving data to collection:", collectionName);
      const dataToSave = newSectionKey
        ? { [newSectionKey]: updatedData[newSectionKey] }
        : updatedData;
      console.log("Data to save:", dataToSave);
      await savePlantDataToFirestore(collectionName, dataToSave);
      console.log(`Data saved successfully to ${collectionName}`);

      // Fetch the latest data again
      const plantCollectionData = await fetchPlantDataFromFirestore(
        "plantCollection"
      );
      const combinedPlantCollectionData = await fetchPlantDataFromFirestore(
        "combinedPlantCollection"
      );

      console.log("Fetched plantCollectionData:", plantCollectionData);
      console.log(
        "Fetched combinedPlantCollectionData:",
        combinedPlantCollectionData
      );

      setPlantData(plantCollectionData);
      setCombinedPlantData(combinedPlantCollectionData);
      setOriginalPlantData(plantCollectionData);
    } catch (error) {
      console.error("Error saving plant data:", error);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      saveUpdatedPlantData(plantData);
      saveUpdatedPlantData(combinedPlantData, undefined, true);
    }
  }, [isEditing]);

  const sortPlantData = () => {
    const allPlants = Object.values(plantData).flat(2);
    const plantsWithId = allPlants.filter((plant) => plant.plantId !== 0);
    const plantsWithoutId = allPlants.filter((plant) => plant.plantId === 0);
    const sortedPlantsWithId = plantsWithId.sort((a, b) => {
      const plantA = plants.find((p) => p.id === a.plantId);
      const plantB = plants.find((p) => p.id === b.plantId);
      return (plantA?.reading || "").localeCompare(plantB?.reading || "", "ja");
    });
    const sortedPlants = [...sortedPlantsWithId, ...plantsWithoutId];
    const sortedData: PlantData = {};
    let index = 0;

    for (const [sectionKey, sectionData] of Object.entries(plantData).sort(
      (a, b) =>
        Number(a[0].replace("section", "").padStart(2, "0")) -
        Number(b[0].replace("section", "").padStart(2, "0"))
    )) {
      const maxCols = getMaxCols(sectionData);
      const newSectionData = [];

      for (let rowIndex = 0; rowIndex < sectionData.length; rowIndex++) {
        const newRow = [];
        for (let colIndex = 0; colIndex < maxCols; colIndex++) {
          if (index < sortedPlants.length) {
            newRow.push(sortedPlants[index]);
            index++;
          } else {
            newRow.push({
              plantId: 0,
              startDate: "",
              cutType: "",
              hasLabel: false,
              uniqueId: "",
            });
          }
        }
        newSectionData.push(newRow);
      }

      sortedData[sectionKey] = newSectionData;
    }

    setPlantData(sortedData);
  };

  const handleSortButtonClick = () => {
    if (isSorted) {
      setPlantData(originalPlantData);
    } else {
      setOriginalPlantData(plantData);
      sortPlantData();
    }
    setIsSorted(!isSorted);
  };

  const createNewSection = (rows: number, cols: number) => {
    const newSection = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        plantId: 0,
        startDate: "",
        cutType: "",
        hasLabel: false,
        uniqueId: "",
      }))
    );
    return newSection;
  };

  const handleAddSection = async () => {
    const isCombined = planterType !== "苗植え";
    const dataToUpdate = isCombined ? combinedPlantData : plantData;
    const newSectionKey = `${
      isCombined ? "combinedSection" : "section"
    }${Object.keys(dataToUpdate).length + 1}`;
    const updatedData = {
      ...dataToUpdate,
      [newSectionKey]: createNewSection(rows, cols),
    };
    if (isCombined) {
      setCombinedPlantData(updatedData);
    } else {
      setPlantData(updatedData);
    }
    setIsModalOpen(false);
    await saveUpdatedPlantData(updatedData, newSectionKey, isCombined);
  };

  return (
    <>
      <main className="bg-[#FBE3DE] flex justify-center">
        <div className="pt-clamp-15vh pb-clamp-20vh max-w-[768px] w-full px-clamp-2vw">
          <div className="flex justify-end space-x-4">
            <Button
              bgColor="#fdf2a0"
              defaultText="編集する"
              changedText="更新する"
              isActive={isEditing}
              onClick={() => setIsEditing(!isEditing)}
            />
            <Button
              bgColor="#add8e6"
              defaultText="並べ替え"
              changedText="並べ替え中"
              isActive={isSorted}
              onClick={handleSortButtonClick}
            />
            <Button
              bgColor="#90EE90"
              defaultText="プランター"
              changedText="追加中"
              isActive={false}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          {Object.entries(plantData)
            .sort((a, b) => {
              const aNum = a[0].replace("section", "").padStart(2, "0");
              const bNum = b[0].replace("section", "").padStart(2, "0");
              return aNum.localeCompare(bNum);
            })
            .map(([sectionName, sectionData]) => {
              console.log("Rendering section:", sectionName);
              const maxCols = getMaxCols(sectionData);
              return (
                <NurseryPlantSectionWrapper
                  key={sectionName}
                  sectionName={sectionName}
                  maxCols={maxCols}
                >
                  {sectionData.map((row, rowIndex) =>
                    row.map((plant, plantIndex) => (
                      <PlantWithToolTip
                        key={`${plant.plantId}-${sectionName}-${rowIndex}-${plantIndex}`}
                        plantId={plant.plantId}
                        plantDate={plant.startDate || ""}
                        cuttingType={plant.cutType || ""}
                        hasLabel={plant.hasLabel || false}
                        isEditing={isEditing}
                        isPlantBg={true}
                        isPlantBorder={true}
                        onUpdate={(
                          newPlantId,
                          newDate,
                          newCuttingType,
                          newHasLabel
                        ) =>
                          handleUpdatePlantData(
                            parseInt(sectionName.replace("section", ""), 10),
                            rowIndex,
                            plantIndex,
                            newPlantId,
                            newDate,
                            newCuttingType,
                            newHasLabel
                          )
                        }
                      />
                    ))
                  )}
                </NurseryPlantSectionWrapper>
              );
            })}
          {Object.entries(combinedPlantData)
            .sort((a, b) => {
              const aNum = a[0].replace("combinedSection", "").padStart(2, "0");
              const bNum = b[0].replace("combinedSection", "").padStart(2, "0");
              return aNum.localeCompare(bNum);
            })
            .map(([sectionName, sectionData]) => {
              console.log("Rendering section:", sectionName);
              const maxCols = getMaxCols(sectionData);
              return (
                <CombinedPlantSectionWrapper
                  key={sectionName}
                  sectionName={sectionName}
                  maxCols={maxCols}
                >
                  {sectionData.map((row, rowIndex) =>
                    row.map((plant, plantIndex) => (
                      <PlantWithToolTip
                        key={`${plant.plantId}-${sectionName}-${rowIndex}-${plantIndex}`}
                        plantId={plant.plantId}
                        plantDate={plant.startDate || ""}
                        cuttingType={plant.cutType || ""}
                        hasLabel={plant.hasLabel || false}
                        isEditing={isEditing}
                        isPlantBg={false}
                        isPlantBorder={false}
                        onUpdate={(
                          newPlantId,
                          newDate,
                          newCuttingType,
                          newHasLabel
                        ) =>
                          handleUpdatePlantData(
                            parseInt(
                              sectionName.replace("combinedSection", ""),
                              10
                            ),
                            rowIndex,
                            plantIndex,
                            newPlantId,
                            newDate,
                            newCuttingType,
                            newHasLabel,
                            true
                          )
                        }
                      />
                    ))
                  )}
                </CombinedPlantSectionWrapper>
              );
            })}
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SectionSizeSelector
          rows={rows}
          cols={cols}
          setRows={setRows}
          setCols={setCols}
          planterType={planterType}
          setPlanterType={setPlanterType}
          onSave={handleAddSection}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
