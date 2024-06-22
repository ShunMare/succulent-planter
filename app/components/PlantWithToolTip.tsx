import React, { useState } from "react";
import { plants } from "@/constants/plantDatabase";
import Plant from "@/app/components/Plant";
import ToolTip from "@/app/components/ToolTip";
import Modal from "@/app/components/Modal";

interface PlantWithToolTipProps {
  plantId: number;
  plantDate: string;
  cuttingType: string;
  isEditing: boolean;
  onUpdate: (newPlantId: number, newDate: string, newCuttingType: string) => void;
}

const PlantWithToolTip: React.FC<PlantWithToolTipProps> = ({
  plantId,
  plantDate,
  cuttingType,
  isEditing,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState(plantId);
  const [selectedDate, setSelectedDate] = useState<string>(plantDate || "");
  const [selectedCuttingType, setSelectedCuttingType] = useState<string>(cuttingType || "");

  const plant = plants.find((p) => p.id === plantId);
  const selectedPlant = plants.find((p) => p.id === selectedPlantId);

  if (!plant) return null;

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const imgSrc = plantId !== 0 ? `/assets/images/succulent/${plant.fileName}.png` : "";
  const altText = plantId !== 0 ? plant.name : "";

  const handlePlantClick = () => {
    if (isEditing) {
      setIsModalOpen(true);
    }
  };

  const handleUpdateClick = () => {
    onUpdate(selectedPlantId, selectedDate, selectedCuttingType);
    setIsModalOpen(false);
  };

  return (
    <div className="relative font-primaryBold">
      {plantId !== 0 && !isEditing ? (
        <ToolTip
          name={plant.name}
          scientificName={plant.scientificName}
          family={plant.family}
          genus={plant.genus}
          cutType={cuttingType}
          startDate={plantDate ? formatDate(plantDate) : ""}
          notes={plant.notes}
          imgSrc={imgSrc}
          alt={altText}
        >
          <Plant
            imgSrc={imgSrc}
            alt={altText}
            isEditing={isEditing}
          />
        </ToolTip>
      ) : (
        <div onClick={handlePlantClick}>
          <Plant
            imgSrc={imgSrc}
            alt={altText}
            isEditing={isEditing}
          />
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-clamp-2.5vw">編集モード</h2>
        <select
          value={selectedPlantId}
          onChange={(e) => setSelectedPlantId(Number(e.target.value))}
          className="mt-clamp-2vw p-clamp-1vw border rounded-clamp-1vw"
        >
          {plants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <div>
          <select
            value={selectedCuttingType}
            onChange={(e) => setSelectedCuttingType(e.target.value)}
            className="mt-clamp-2vw p-clamp-1vw mr-clamp-2vw border rounded-clamp-1vw"
          >
            <option value="">選択してください</option>
            <option value="胴切り">胴切り</option>
            <option value="枝切り">枝切り</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-clamp-2vw p-clamp-1vw border rounded-clamp-1vw"
          />
        </div>
        {selectedPlant && (
          <div className="flex justify-end mt-clamp-4vw">
            <button
              onClick={handleUpdateClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-clamp-1vw mt-clamp-2vw"
            >
              更新する
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PlantWithToolTip;
