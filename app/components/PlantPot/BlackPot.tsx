import React from "react";

interface BlackPotProps {
  children: React.ReactNode;
  maxCols: number;
}

const BlackPot: React.FC<BlackPotProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative rounded-full grid p-clamp-1vw aspect-square"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-clamp-53vw aspect-square">
        <img className="w-full" src="/assets/images/pot/blackPot.png" alt="黒い鉢" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
      {children}
    </div>
  );
};

export default BlackPot;
