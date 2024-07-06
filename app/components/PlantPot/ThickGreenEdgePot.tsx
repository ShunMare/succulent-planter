import React from "react";

interface ThickGreenEdgePotProps {
  children: React.ReactNode;
  maxCols: number;
}

const ThickGreenEdgePot: React.FC<ThickGreenEdgePotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw items-center"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] w-[155%] aspect-square">
        <img className="w-full" src="/assets/images/pot/thickGreenEdgePot.png" alt="緑のエッジの太い鉢" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default ThickGreenEdgePot;
