import ResponsivePicture from "@/app/responsivePicture";
import React from "react";

interface CatLikePotProps {
  children: React.ReactNode;
  maxCols: number;
}

const CatLikePot: React.FC<CatLikePotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid items-center p-clamp-1vw"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[165%] aspect-square">
        <ResponsivePicture className="w-full" src="/assets/images/pot/catLikePot" alt="猫すっき" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default CatLikePot;
