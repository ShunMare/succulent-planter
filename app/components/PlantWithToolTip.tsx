import React, { useState } from "react";
import { plants } from "@/constants/plantDatabase";
import Plant from "@/app/components/Plant";
import ToolTip from "@/app/components/ToolTip";
import EditPlantModal from "@/app/components/EditPlantModal";

interface PlantWithToolTipProps {
  plantId: number;
  plantDate: string;
  cuttingType: string;
  hasLabel: boolean;
  isEditing: boolean;
  onUpdate: (
    newPlantId: number,
    newDate: string,
    newCuttingType: string,
    newHasLabel: boolean
  ) => void;
  isPlantBg?: boolean;
  isPlantBorder?: boolean;
}

const PlantWithToolTip: React.FC<PlantWithToolTipProps> = ({
  plantId,
  plantDate,
  cuttingType,
  hasLabel,
  isEditing,
  onUpdate,
  isPlantBg = true,
  isPlantBorder = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plant = plants.find((p) => p.id === plantId);

  if (!plant) return null;

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const imgSrc = plantId !== 0 ? `/assets/images/succulent/${plant.fileName}` : "";
  const altText = plantId !== 0 ? plant.name : "";

  const handlePlantClick = () => {
    if (isEditing) {
      setIsModalOpen(true);
    }
  };

  const handleUpdate = (
    newPlantId: number,
    newDate: string,
    newCuttingType: string,
    newHasLabel: boolean
  ) => {
    onUpdate(newPlantId, newDate, newCuttingType, newHasLabel);
    setIsModalOpen(false);
  };

  return (
    <div className="relative font-primaryBold flex justify-center">
      {plantId !== 0 && !isEditing ? (
        <ToolTip
          name={plant.name}
          scientificName={plant.scientificName}
          family={plant.family}
          genus={plant.genus}
          cutType={cuttingType}
          startDate={plantDate ? formatDate(plantDate) : ""}
          notes={plant.notes}
          relatedId={plant.relatedId}
          imgSrc={imgSrc}
          alt={altText}
        >
          <Plant
            className="w-clamp-15vw"
            imgSrc={imgSrc}
            alt={altText}
            isEditing={isEditing}
            hasLabel={hasLabel}
            isBg={isPlantBg}
            isBorder={isPlantBorder}
          />
        </ToolTip>
      ) : (
        <div onClick={handlePlantClick}>
          <Plant
            className="w-clamp-15vw"
            imgSrc={imgSrc}
            alt={altText}
            isEditing={isEditing}
            hasLabel={hasLabel}
            isBg={isPlantBg}
            isBorder={isPlantBorder}
          />
        </div>
      )}
      {isModalOpen && (
        <EditPlantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plants={plants}
          targetPlantId={plantId}
          initialHasLabel={hasLabel}
          initialCuttingType={cuttingType}
          initialDate={plantDate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default PlantWithToolTip;
