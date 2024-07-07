import React from "react";

interface OrangePlanterProps {
  children: React.ReactNode;
  maxCols: number;
}

const OrangePlanter: React.FC<OrangePlanterProps> = ({ children, maxCols }) => {
  return (
    <div
      className="relative border-[#bd5935] border-y-clamp-2vw border-x-clamp-3vw grid rounded-clamp-1vw"
      style={{
        gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cover bg-soil rounded-clamp-1vw"></div>
      {children}
    </div>
  );
};

export default OrangePlanter;
