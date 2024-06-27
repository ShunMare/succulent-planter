import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  sectionName: string;
  maxCols: number;
}

const CombinedPlantSectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  sectionName,
  maxCols,
}) => {
  return (
    <div className="flex justify-center mt-clamp-4vh">
      <div
        className="border-[#BC511C] border-clamp-1vw rounded-full bg-cover bg-soil grid p-clamp-1vw aspect-square"
        style={{
          gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CombinedPlantSectionWrapper;
