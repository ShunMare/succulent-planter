import React from "react";

interface PlantProps {
  className?: string;
  imgSrc: string;
  alt: string;
  isEditing: boolean;
  hasLabel: boolean;
}

const Plant: React.FC<PlantProps> = ({
  className = "",
  imgSrc,
  alt,
  isEditing,
  hasLabel,
}) => {
  return (
    <div
      className={`relative rounded-full border-black border-2 aspect-square bg-cover bg-soil ${className}`}
    >
      <div className="w-full brightness-105 contrast-125">
        {imgSrc && <img src={imgSrc} alt={alt} />}
      </div>
      {isEditing && (
        <div className="absolute top-0 left-0 aspect-square rounded-full w-full bg-black z-10 bg-opacity-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[30%] w-[4%] bg-[#ffafab]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[4%] w-[30%] bg-[#ffafab]"></div>
        </div>
      )}
      {hasLabel && (
        <div className="absolute bottom-clamp-0.5vw right-clamp-0.5vw bg-white rounded-full h-4 w-4 border border-black"></div>
      )}
    </div>
  );
};

export default Plant;
