import React from "react";
import ResponsivePicture from "@/app/responsivePicture";

interface PlantProps {
  className?: string;
  imgSrc: string;
  alt: string;
  isEditing: boolean;
  hasLabel: boolean;
  isBg?: boolean;
  isBorder?: boolean;
}

const Plant: React.FC<PlantProps> = ({
  className = "",
  imgSrc,
  alt,
  isEditing,
  hasLabel,
  isBg = true,
  isBorder = true,
}) => {
  const bgClass = isBg ? "bg-soil" : "";
  const borderClass = isBorder ? "border-plant-gray" : "";

  return (
    <div
      className={`relative rounded-clamp-2vw aspect-square bg-cover ${bgClass} ${borderClass} ${className}`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] brightness-105 contrast-125">
        {imgSrc && (
          <ResponsivePicture className="w-full" src={imgSrc} alt={alt} />
        )}
      </div>
      {isEditing && (
        <div className="absolute top-0 left-0 aspect-square rounded-full w-full bg-black z-10 bg-opacity-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[30%] w-[4%] bg-[#ffafab]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[4%] w-[30%] bg-[#ffafab]"></div>
        </div>
      )}
      {hasLabel && (
        <div className="absolute bottom-clamp-0.5vw right-clamp-0.5vw bg-white rounded-full h-clamp-2.5vw w-clamp-2.5vw border border-black"></div>
      )}
    </div>
  );
};

export default Plant;
