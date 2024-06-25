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
import { db, auth, login } from "@/libs/firestore/firebase";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [plantData, setPlantData] = useState<PlantData>({});
  const [originalPlantData, setOriginalPlantData] = useState<PlantData>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(6);

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      await login();
      const fetchedPlantData = await fetchPlantDataFromFirestore(
        "plantCollection"
      );
      setPlantData(fetchedPlantData);
      setOriginalPlantData(fetchedPlantData);
    };

    authenticateAndFetchData();
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
      if (!updatedPlantData[sectionKey][rowIndex][plantIndex].uniqueId) {
        updatedPlantData[sectionKey][rowIndex][plantIndex].uniqueId = `${sectionKey}-${rowIndex}-${plantIndex}`;
      }
      updatedPlantData[sectionKey][rowIndex][plantIndex].plantId = newPlantId;
      updatedPlantData[sectionKey][rowIndex][plantIndex].startDate = newDate;
      updatedPlantData[sectionKey][rowIndex][plantIndex].cutType = newCuttingType;
      updatedPlantData[sectionKey][rowIndex][plantIndex].hasLabel = newHasLabel;
      setPlantData(updatedPlantData);
    }
  };

  const saveUpdatedPlantData = async (updatedData: any) => {
    try {
      console.log("Updated data being sent:", updatedData);

      await savePlantDataToFirestore("plantCollection", updatedData);
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
    const sortedPlants = allPlants.sort((a, b) => {
      if (a.plantId === 0) return 1;
      if (b.plantId === 0) return -1;
      const plantA = plants.find((p) => p.id === a.plantId);
      const plantB = plants.find((p) => p.id === b.plantId);
      return (plantA?.reading || "").localeCompare(plantB?.reading || "", "ja");
    });

    const sortedData: PlantData = {};
    let index = 0;

    for (const [sectionKey, sectionData] of Object.entries(plantData)) {
      const maxCols = getMaxCols(sectionData);
      const newSectionData = [];

      for (let rowIndex = 0; rowIndex < sectionData.length; rowIndex++) {
        const newRow = sortedPlants.slice(index, index + maxCols);
        newSectionData.push(newRow);
        index += maxCols;
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
        uniqueId: "", // 新しいユニークIDを生成するためのプレースホルダー
      }))
    );
    return newSection;
  };

  const handleAddSection = () => {
    const newSectionKey = `section${Object.keys(plantData).length + 1}`;
    setPlantData({
      ...plantData,
      [newSectionKey]: createNewSection(rows, cols),
    });
    setIsModalOpen(false);
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
              defaultText="プランターを追加"
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
            .map((sectionName) => (
              <div
                key={sectionName}
                className="flex justify-center mt-clamp-4vh"
              >
                <div
                  className="border-black border-2 grid gap-clamp-1vw p-clamp-0.5vw"
                  style={{
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
            ))}
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SectionSizeSelector
          rows={rows}
          cols={cols}
          setRows={setRows}
          setCols={setCols}
          onSave={handleAddSection}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
