import React from "react";

interface Props {
  idName?: string;
  largeBreakpoint?: number;
  mediumBreakpoint?: number;
  className?: string;
  src: string;
  largeScale?: number;
  mediumScale?: number;
  smallScale?: number;
  loading?: "eager" | "lazy";
  alt: string;
}

const ResponsivePicture: React.FC<Props> = ({
  idName = "",
  largeBreakpoint = 768,
  mediumBreakpoint = 430,
  className = "",
  src,
  largeScale = 1,
  mediumScale = 1,
  smallScale = 1,
  loading = "lazy",
  alt,
}) => {
  const largeImageWebp = largeScale > 1 ? `${src}@${largeScale}x.webp` : `${src}.webp`;
  const largeImagePng = largeScale > 1 ? `${src}@${largeScale}x.png` : `${src}.png`;
  const mediumImageWebp = mediumScale > 1 ? `${src}@${mediumScale}x.webp` : `${src}.webp`;
  const mediumImagePng = mediumScale > 1 ? `${src}@${mediumScale}x.png` : `${src}.png`;
  const smallImageWebp = smallScale > 1 ? `${src}@${smallScale}x.webp` : `${src}.webp`;
  const smallImagePng = smallScale > 1 ? `${src}@${smallScale}x.png` : `${src}.png`;

  return (
    <picture>
      <source
        media={`(min-width: ${largeBreakpoint}px)`}
        srcSet={largeImageWebp}
        type="image/webp"
      />
      <source
        media={`(min-width: ${largeBreakpoint}px)`}
        srcSet={largeImagePng}
        type="image/png"
      />

      <source
        media={`(min-width: ${mediumBreakpoint}px)`}
        srcSet={mediumImageWebp}
        type="image/webp"
      />
      <source
        media={`(min-width: ${mediumBreakpoint}px)`}
        srcSet={mediumImagePng}
        type="image/png"
      />

      <source srcSet={smallImageWebp} type="image/webp" />
      <source srcSet={smallImagePng} type="image/png" />

      <img
        id={idName}
        src={smallImagePng}
        className={`pointer-events-none ${className}`}
        loading={loading}
        alt={alt}
        onContextMenu={(e) => e.preventDefault()}
      />
    </picture>
  );
};

export default ResponsivePicture;
