import ResponsivePicture from "@/app/responsivePicture";
import React from "react";

interface BlackPlasticPotProps {
  children: React.ReactNode;
  maxCols: number;
}

const BlackPlasticPot: React.FC<BlackPlasticPotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[195%] aspect-square">
        <ResponsivePicture className="w-full" src="/assets/images/pot/blackPlasticPot" alt="プラスチックの黒いポット" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-clamp-2vw"></div>
      {children}
    </div>
  );
};

export default BlackPlasticPot;
