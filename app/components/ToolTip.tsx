import React, { useState, useRef, useEffect } from 'react';

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
  children,
}) => {
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      if (containerRect.top - tooltipRect.height > 0) {
        setPosition('top');
      } else if (window.innerHeight - containerRect.bottom - tooltipRect.height > 0) {
        setPosition('bottom');
      } else if (containerRect.left - tooltipRect.width > 0) {
        setPosition('left');
      } else if (window.innerWidth - containerRect.right - tooltipRect.width > 0) {
        setPosition('right');
      } else {
        setPosition('top');
      }
    }
  };

  useEffect(() => {
    handleMouseEnter();
  }, []);

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
          position === 'top'
            ? 'bottom-full mb-clamp-2vw left-1/2 transform -translate-x-1/2'
            : position === 'bottom'
            ? 'top-full mt-clamp-2vw left-1/2 transform -translate-x-1/2'
            : position === 'left'
            ? 'right-full mr-clamp-2vw top-1/2 transform -translate-y-1/2'
            : 'left-full ml-clamp-2vw top-1/2 transform -translate-y-1/2'
        } rounded-clamp-2vw w-clamp-40vw bg-white text-clamp-2vw py-clamp-2vh px-clamp-2vw hidden`}
      >
        <p className="text-clamp-3vw">{name}</p>
        <p className="text-clamp-2vw">{scientificName}</p>
        <div className="rounded-clamp-1vw overflow-hidden my-clamp-1vh">
          <img className="w-full" src={imgSrc} alt={alt} />
        </div>
        <p className="text-clamp-2vw">
          {family} {genus}
        </p>
        <p className="text-clamp-1.5vw text-end mt-clamp-1vh">
          {cutType} {startDate}
        </p>
        <p className="mt-clamp-1vh">{notes}</p>
      </div>
    </div>
  );
};

export default ToolTip;
