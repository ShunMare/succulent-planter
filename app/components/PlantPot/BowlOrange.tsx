import React from "react";

interface PotBlackProps {
  children: React.ReactNode;
  maxCols: number;
}

const PotBlack: React.FC<PotBlackProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative border-[#dd6c37] border-clamp-0.3vw bg-[#e25712] rounded-full grid p-clamp-1vw aspect-square"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default PotBlack;
