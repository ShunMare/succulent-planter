import React from "react";
import PotBlack from "@/app/components/PlantPot/PotBlack";
import BowlWhite from "@/app/components/PlantPot/BowlWhite";
import BowlOrange from "@/app/components/PlantPot/BowlOrange";

interface SectionWrapperProps {
  children: React.ReactNode;
  sectionName: string;
  maxCols: number;
  potType: number;
}

const CombinedPlantSectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  sectionName,
  maxCols,
  potType,
}) => {
  const renderPotType = () => {
    switch (potType) {
      case 0:
        return <BowlWhite maxCols={maxCols}>{children}</BowlWhite>;
      case 1:
        return <BowlOrange maxCols={maxCols}>{children}</BowlOrange>;
      default:
        return <PotBlack maxCols={maxCols}>{children}</PotBlack>;
    }
  };

  return (
    <div className="flex justify-center mt-clamp-4vh">{renderPotType()}</div>
  );
};

export default CombinedPlantSectionWrapper;
