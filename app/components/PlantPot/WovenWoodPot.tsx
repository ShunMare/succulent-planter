import ResponsivePicture from "@/app/responsivePicture";
import React from "react";

interface WovenWoodPotProps {
  children: React.ReactNode;
  maxCols: number;
}

const WovenWoodPot: React.FC<WovenWoodPotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-[52.5%] w-[150%] aspect-square">
        <ResponsivePicture className="w-full" src="/assets/images/pot/wovenWoodPot" alt="木で編み込まれたつくられた鉢" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default WovenWoodPot;
