import ResponsivePicture from "@/app/responsivePicture";
import React from "react";

interface SquareBrickPotProps {
  children: React.ReactNode;
  maxCols: number;
}

const SquareBrickPot: React.FC<SquareBrickPotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[51%] w-[200%] aspect-square">
        <ResponsivePicture className="w-full" src="/assets/images/pot/squareBrickPot" alt="四角いレンガの鉢" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default SquareBrickPot;
