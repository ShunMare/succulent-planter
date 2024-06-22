"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import PlantWithToolTip from "@/app/components/PlantWithToolTip";
import { plantData as initialPlantData, PlantData } from "@/data/plantData";
import { plants } from "@/constants/plantDatabase";
import { getMaxCols } from "@/utils/utilities";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [plantData, setPlantData] = useState<PlantData>(initialPlantData);
  const [originalPlantData, setOriginalPlantData] = useState<PlantData>(initialPlantData);

  const handleUpdatePlantData = (
    sectionIndex: number,
    rowIndex: number,
    plantIndex: number,
    newPlantId: number,
    newDate: string,
    newCuttingType: string
  ) => {
    const sectionKey = `section${sectionIndex}`;
    const updatedPlantData = { ...plantData };
    if (updatedPlantData[sectionKey]) {
      updatedPlantData[sectionKey][rowIndex][plantIndex].plantId = newPlantId;
      updatedPlantData[sectionKey][rowIndex][plantIndex].startDate = newDate;
      updatedPlantData[sectionKey][rowIndex][plantIndex].cutType = newCuttingType;
      setPlantData(updatedPlantData);
    }
  };

  const saveUpdatedPlantData = async (updatedData: PlantData) => {
    try {
      const response = await fetch("/api/savePlantData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to save plant data");
      }

      const data = await response.json();
      console.log("Plant data saved successfully:", data);
    } catch (error) {
      console.error("Error saving plant data:", error);
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

  const createNewSection = () => {
    const newSection = Array.from({ length: 4 }, () =>
      Array.from({ length: 6 }, () => ({
        plantId: 0,
        startDate: "",
        cutType: ""
      }))
    );
    return newSection;
  };

  const handleAddSection = () => {
    const newSectionKey = `section${Object.keys(plantData).length + 1}`;
    setPlantData({
      ...plantData,
      [newSectionKey]: createNewSection(),
    });
  };

  useEffect(() => {
    if (!isEditing) {
      saveUpdatedPlantData(plantData);
    }
  }, [isEditing]);

  return (
    <>
      <main className="bg-[#FBE3DE] flex justify-center">
        <div className="py-clamp-20vh max-w-[768px] w-full px-clamp-5vw">
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
              onClick={handleAddSection}
            />
          </div>
          {plantData &&
            Object.entries(plantData).map(
              ([sectionName, sectionData], sectionIndex) => (
                <div
                  key={sectionName}
                  className="border-black border-2 w-full grid gap-clamp-1vw p-clamp-0.5vw mt-clamp-4vh"
                  style={{
                    gridTemplateColumns: `repeat(${getMaxCols(
                      sectionData
                    )}, minmax(0, 1fr))`,
                  }}
                >
                  {sectionData.map((row, rowIndex) =>
                    row.map((plant, plantIndex) => (
                      <PlantWithToolTip
                        key={`${sectionIndex}-${rowIndex}-${plantIndex}`}
                        plantId={plant.plantId}
                        plantDate={plant.startDate || ""}
                        cuttingType={plant.cutType || ""}
                        isEditing={isEditing}
                        onUpdate={(newPlantId, newDate, newCuttingType) =>
                          handleUpdatePlantData(
                            sectionIndex + 1,
                            rowIndex,
                            plantIndex,
                            newPlantId,
                            newDate,
                            newCuttingType
                          )
                        }
                      />
                    ))
                  )}
                </div>
              )
            )}
        </div>
      </main>
    </>
  );
}
