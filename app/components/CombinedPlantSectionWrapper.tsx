import React from "react";
import BlackPot from "@/app/components/PlantPot/BlackPot";
import CatLikePot from "@/app/components/PlantPot/CatLikePot";
import DarkBrownPot from "@/app/components/PlantPot/DarkBrownPot";
import GrayIronPot from "@/app/components/PlantPot/GrayIronPot";
import LightBrownPot from "@/app/components/PlantPot/LightBrownPot";
import WhitePot from "@/app/components/PlantPot/WhitePot";
import WideGrayEdgePot from "@/app/components/PlantPot/WideGrayEdgePot";
import WovenWoodPot from "@/app/components/PlantPot/WovenWoodPot";
import BluePot from "@/app/components/PlantPot/BluePot";
import GreenPot from "@/app/components/PlantPot/GreenPot";
import SquareBrickPot from "@/app/components/PlantPot/SquareBrickPot";
import ThickGreenEdgePot from "@/app/components/PlantPot/ThickGreenEdgePot";
import ThinBrownEdgePot from "@/app/components/PlantPot/ThinBrownEdgePot";
import WoodenBoxPot from "@/app/components/PlantPot/WoodenBoxPot";
import SimpleBlackPot from "@/app/components/PlantPot/SimpleBlackPot";
import SimpleOrangePot from "@/app/components/PlantPot/SimpleOrangePot";
import BlackPlanter from "@/app/components/PlantPot/BlackPlanter";
import SimpleBlackPlanter from "@/app/components/PlantPot/SimpleBlackPlanter";
import OrangePlanter from "@/app/components/PlantPot/OrangePlanter";
import WavyEdgeWhitePot from "./PlantPot/WavyEdgeWhitePot";
import RectangleOrangePot from "./PlantPot/RectangleOrangePot";
import RectangleWhitePot from "./PlantPot/RectangleWhitePot";
import BlackPlasticPot from "./PlantPot/BlackPlasticPot";

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
        return <BlackPot maxCols={maxCols}>{children}</BlackPot>;
      case 1:
        return <CatLikePot maxCols={maxCols}>{children}</CatLikePot>;
      case 2:
        return <DarkBrownPot maxCols={maxCols}>{children}</DarkBrownPot>;
      case 3:
        return <GrayIronPot maxCols={maxCols}>{children}</GrayIronPot>;
      case 4:
        return <LightBrownPot maxCols={maxCols}>{children}</LightBrownPot>;
      case 5:
        return <WhitePot maxCols={maxCols}>{children}</WhitePot>;
      case 6:
        return <WideGrayEdgePot maxCols={maxCols}>{children}</WideGrayEdgePot>;
      case 7:
        return <WovenWoodPot maxCols={maxCols}>{children}</WovenWoodPot>;
      case 8:
        return <BluePot maxCols={maxCols}>{children}</BluePot>;
      case 9:
        return <GreenPot maxCols={maxCols}>{children}</GreenPot>;
      case 10:
        return <SquareBrickPot maxCols={maxCols}>{children}</SquareBrickPot>;
      case 11:
        return (
          <ThickGreenEdgePot maxCols={maxCols}>{children}</ThickGreenEdgePot>
        );
      case 12:
        return <SimpleBlackPot maxCols={maxCols}>{children}</SimpleBlackPot>;
      case 13:
        return (
          <ThinBrownEdgePot maxCols={maxCols}>{children}</ThinBrownEdgePot>
        );
      case 14:
        return <WoodenBoxPot maxCols={maxCols}>{children}</WoodenBoxPot>;
      case 15:
        return <SimpleOrangePot maxCols={maxCols}>{children}</SimpleOrangePot>;
      case 16:
        return (
          <SimpleBlackPlanter maxCols={maxCols}>{children}</SimpleBlackPlanter>
        );
      case 17:
        return <BlackPlanter maxCols={maxCols}>{children}</BlackPlanter>;
      case 18:
        return <OrangePlanter maxCols={maxCols}>{children}</OrangePlanter>;
      case 19:
        return <BlackPlasticPot maxCols={maxCols}>{children}</BlackPlasticPot>;
      case 20:
        return (
          <RectangleOrangePot maxCols={maxCols}>{children}</RectangleOrangePot>
        );
      case 21:
        return (
          <RectangleWhitePot maxCols={maxCols}>{children}</RectangleWhitePot>
        );
      case 22:
        return (
          <WavyEdgeWhitePot maxCols={maxCols}>{children}</WavyEdgeWhitePot>
        );
      default:
        return <SimpleBlackPot maxCols={maxCols}>{children}</SimpleBlackPot>;
    }
  };

  return (
    <div className="flex justify-center mt-clamp-4vh">{renderPotType()}</div>
  );
};

export default CombinedPlantSectionWrapper;
