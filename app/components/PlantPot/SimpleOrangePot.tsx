import React from "react";

interface SimpleOrangePotProps {
  children: React.ReactNode;
  maxCols: number;
}

const SimpleOrangePot: React.FC<SimpleOrangePotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] bg-[#a2450f] aspect-square rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default SimpleOrangePot;
