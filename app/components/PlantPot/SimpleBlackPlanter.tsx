import React from "react";

interface SimpleBlackPlanterProps {
  children: React.ReactNode;
  maxCols: number;
}

const SimpleBlackPlanter: React.FC<SimpleBlackPlanterProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative border-black border-clamp-1vw grid rounded-clamp-1vw"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cover bg-soil rounded-clamp-1vw"></div>
      {children}
    </div>
  );
};

export default SimpleBlackPlanter;
