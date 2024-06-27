import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  sectionName: string;
  maxCols: number;
}

const NurseryPlantSectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  sectionName,
  maxCols,
}) => {
  return (
    <div className="flex justify-center mt-clamp-4vh">
      <div
        className="border-[#1f1f1f] border-clamp-1vw bg-black grid gap-clamp-1vw rounded-clamp-1vw p-clamp-0.5vw"
        style={{
          gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default NurseryPlantSectionWrapper;
