import React from "react";

interface SimpleBlackPotProps {
  children: React.ReactNode;
  maxCols: number;
}

const SimpleBlackPot: React.FC<SimpleBlackPotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] bg-black aspect-square rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default SimpleBlackPot;
