import ResponsivePicture from "@/app/ResponsivePicture";
import React from "react";

interface RectangleWhitePotProps {
  children: React.ReactNode;
  maxCols: number;
}

const RectangleWhitePot: React.FC<RectangleWhitePotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-[51%] -translate-y-[49%] w-[150%] aspect-square">
        <ResponsivePicture className="w-full" src="/assets/images/pot/rectangleWhitePot" alt="四角い白いポット" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil"></div>
      {children}
    </div>
  );
};

export default RectangleWhitePot;
