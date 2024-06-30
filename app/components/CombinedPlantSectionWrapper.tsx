import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  sectionName: string;
  maxCols: number;
  potType: number;
}

const CombinedPlantSectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  sectionName,
  maxCols,
  potType
}) => {
  return (
    <div className="flex justify-center mt-clamp-4vh">
      <div
        className="relative border-[#dd6c37] border-clamp-0.3vw bg-[#e25712] rounded-full grid p-clamp-1vw aspect-square"
        style={{
          gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[93%] aspect-square bg-cover bg-soil rounded-full"></div>
        {children}
      </div>
    </div>
  );
};

export default CombinedPlantSectionWrapper;
