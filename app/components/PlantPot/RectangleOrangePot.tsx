import React from "react";

interface RectangleOrangePotProps {
  children: React.ReactNode;
  maxCols: number;
}

const RectangleOrangePot: React.FC<RectangleOrangePotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] aspect-square">
        <img className="w-full" src="/assets/images/pot/rectangleOrangePot.png" alt="四角形のオレンジの鉢" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil"></div>
      {children}
    </div>
  );
};

export default RectangleOrangePot;
