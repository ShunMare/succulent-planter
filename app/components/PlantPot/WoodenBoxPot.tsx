import ResponsivePicture from "@/app/ResponsivePicture";
import React from "react";

interface WoodenBoxPotProps {
  children: React.ReactNode;
  maxCols: number;
}

const WoodenBoxPot: React.FC<WoodenBoxPotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[48.5%] w-[260%] aspect-square">
        <ResponsivePicture className="w-full" src="/assets/images/pot/woodenBoxPot" alt="木箱の鉢" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil"></div>
      {children}
    </div>
  );
};

export default WoodenBoxPot;
