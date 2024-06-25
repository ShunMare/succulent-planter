import React, { useState, useRef, useEffect } from "react";
import { plants } from "@/constants/plantDatabase";

interface Props {
  name: string;
  scientificName: string;
  family: string;
  genus: string;
  cutType: string;
  startDate: string;
  notes: string;
  imgSrc: string;
  alt: string;
  relatedId: number[];
  children: React.ReactNode;
}

const ToolTip: React.FC<Props> = ({
  name,
  scientificName,
  family,
  genus,
  cutType,
  startDate,
  notes,
  imgSrc,
  alt,
  relatedId,
  children,
}) => {
  const [position, setPosition] = useState<
    "top-left" | "top-right" | "bottom-left" | "bottom-right"
  >("top-right");
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const spaceAbove = containerRect.top - tooltipRect.height;
      const spaceBelow =
        window.innerHeight - containerRect.bottom - tooltipRect.height;
      const spaceLeft = containerRect.left - tooltipRect.width;
      const spaceRight =
        window.innerWidth - containerRect.right - tooltipRect.width;
      const containerCenter = containerRect.top + containerRect.height / 2;
      const windowCenter = window.innerHeight / 2;

      if (containerRect.left > window.innerWidth / 2) {
      if (containerCenter < windowCenter && spaceBelow > spaceAbove) {
          setPosition("bottom-left");
        } else {
          setPosition("top-left");
        }
      } else {
        if (containerCenter < windowCenter && spaceBelow > spaceAbove) {
          setPosition("bottom-right");
        } else {
          setPosition("top-right");
        }
      }
    }
  };

  useEffect(() => {
    handleMouseEnter();
  }, []);

  const relatedNames = relatedId
    .map((id) => plants.find((plant) => plant.id === id)?.name)
    .filter((name): name is string => !!name);

  return (
    <div
      ref={containerRef}
      className="tooltip-container relative"
      onMouseEnter={handleMouseEnter}
    >
      {children}
      <div
        ref={tooltipRef}
        className={`font-primaryBold tooltip-content absolute z-50 ${
          position === "top-right"
            ? "bottom-full mb-clamp-2vw left-full ml-clamp-2vw"
            : position === "bottom-right"
            ? "top-full mt-clamp-2vw left-full ml-clamp-2vw"
            : position === "top-left"
            ? "bottom-full mb-clamp-2vw right-full mr-clamp-2vw"
            : "top-full mt-clamp-2vw right-full mr-clamp-2vw"
        } rounded-clamp-2vw w-clamp-40vw bg-white text-clamp-2vw py-clamp-2vh px-clamp-2vw hidden`}
      >
        <p className="text-clamp-3.5vw">{name}</p>
        <p className="text-clamp-2.5vw">{scientificName}</p>
        {relatedNames.length > 0 && (
          <div className="mt-clamp-1vh flex flex-wrap text-clamp-2.3vw">
            <p className="font-bold whitespace-nowrap mr-clamp-1.5vw">別名:</p>
            <ul className="flex flex-wrap list-none p-0 m-0">
              {relatedNames.map((relatedName) => (
                <li
                  className="mr-clamp-1.5vw whitespace-nowrap"
                  key={relatedName}
                >
                  {relatedName}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-clamp-1vw overflow-hidden my-clamp-1vh">
          <img className="w-full" src={imgSrc} alt={alt} />
        </div>
        <p className="text-clamp-2.5vw">
          {family} {genus}
        </p>
        <p className="text-clamp-2vw text-end mt-clamp-1vh">
          {cutType} {startDate}
        </p>
        <p className="mt-clamp-1vh text-clamp-2.3vw">{notes}</p>
      </div>
    </div>
  );
};

export default ToolTip;
