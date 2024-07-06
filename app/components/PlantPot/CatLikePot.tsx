import React from "react";

interface CatLikePotProps {
  children: React.ReactNode;
  maxCols: number;
}

const CatLikePot: React.FC<CatLikePotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw aspect-square"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-clamp-50vw aspect-square">
        <img className="w-full" src="/assets/images/pot/catLikePot.png" alt="猫すっき" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default CatLikePot;
