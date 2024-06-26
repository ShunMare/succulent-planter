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

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [plantData, setPlantData] = useState<PlantData>({});
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
        const [plantCollectionData, combinedPlantCollectionData] = await Promise.all([
          fetchPlantDataFromFirestore("plantCollection"),
          fetchPlantDataFromFirestore("combinedPlantCollection")
        ]);
        const mergedData = {
          ...plantCollectionData,
          ...combinedPlantCollectionData
        };
        setPlantData(mergedData);
        setOriginalPlantData(mergedData);
      } else {
        setPlantData(localPlantData);
        setOriginalPlantData(localPlantData);
      }
    };

    fetchData();
  }, []);

  const handleUpdatePlantData = (
    sectionIndex: number,
    rowIndex: number,
    plantIndex: number,
    newPlantId: number,
    newDate: string,
    newCuttingType: string,
    newHasLabel: boolean
  ) => {
    const sectionKey = `section${sectionIndex}`;
    const updatedPlantData = { ...plantData };
    if (updatedPlantData[sectionKey]) {
      const plantToUpdate = updatedPlantData[sectionKey][rowIndex][plantIndex];
      if (!plantToUpdate.uniqueId) {
        plantToUpdate.uniqueId = `${sectionKey}-${rowIndex}-${plantIndex}`;
      }
      plantToUpdate.plantId = newPlantId;
      plantToUpdate.startDate = newDate;
      plantToUpdate.cutType = newCuttingType;
      plantToUpdate.hasLabel = newHasLabel;
      setPlantData(updatedPlantData);
    }
  };

  const saveUpdatedPlantData = async (
    updatedData: any,
    newSectionKey?: string
  ) => {
    try {
      if (planterType === "苗植え") {
        await savePlantDataToFirestore("plantCollection", updatedData);
      } else if (planterType === "寄せ植え" && newSectionKey) {
        const newSectionData = { [newSectionKey]: updatedData[newSectionKey] };
        await savePlantDataToFirestore(
          "combinedPlantCollection",
          newSectionData
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving plant data:", error.message);
      } else {
        console.error("Unexpected error saving plant data:", error);
      }
    }
  };

  useEffect(() => {
    if (!isEditing) {
      saveUpdatedPlantData(plantData);
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
    sortedPlants.forEach((plant, index) => {
      const plantInfo = plants.find((p) => p.id === plant.plantId);
    });
    const sortedData: PlantData = {};
    let index = 0;

    for (const [sectionKey, sectionData] of Object.entries(plantData).sort(
      (a, b) =>
        Number(a[0].replace("section", "")) -
        Number(b[0].replace("section", ""))
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
    const newSectionKey = `section${Object.keys(plantData).length + 1}`;
    const updatedData = {
      ...plantData,
      [newSectionKey]: createNewSection(rows, cols),
    };
    setPlantData(updatedData);
    setIsModalOpen(false);
    await saveUpdatedPlantData(updatedData, newSectionKey);
  };

  const getSectionStyle = (sectionName: string) => {
    return sectionName.startsWith("combinedSection")
      ? { backgroundColor: "#FFCCCC" } // red background for combinedPlantCollection sections
      : { backgroundColor: "#000000" }; // black background for plantCollection sections
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
          {Object.keys(plantData)
            .sort((a, b) => {
              const aNum = parseInt(a.replace("section", ""), 10);
              const bNum = parseInt(b.replace("section", ""), 10);
              return aNum - bNum;
            })
            .map((sectionName) => {
              plantData[sectionName].forEach((row, rowIndex) => {
                row.forEach((plant, plantIndex) => {
                  const plantInfo = plants.find((p) => p.id === plant.plantId);
                });
              });

              return (
                <div
                  key={sectionName}
                  className="flex justify-center mt-clamp-4vh"
                >
                  <div
                    className="border-[#1F1F1F] border-clamp-1vw grid gap-clamp-1vw rounded-clamp-1vw p-clamp-0.5vw"
                    style={{
                      ...getSectionStyle(sectionName),
                      gridTemplateColumns: `repeat(${getMaxCols(
                        plantData[sectionName]
                      )}, minmax(0, 1fr))`,
                    }}
                  >
                    {plantData[sectionName].map((row, rowIndex) =>
                      row.map((plant, plantIndex) => (
                        <PlantWithToolTip
                          key={`${plant.plantId}-${sectionName}-${rowIndex}-${plantIndex}`}
                          plantId={plant.plantId}
                          plantDate={plant.startDate || ""}
                          cuttingType={plant.cutType || ""}
                          hasLabel={plant.hasLabel || false}
                          isEditing={isEditing}
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
                  </div>
                </div>
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
