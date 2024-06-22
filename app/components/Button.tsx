import React from "react";

interface ButtonProps {
  className?: string;
  bgColor?: string;
  defaultText: string;
  changedText: string;
  isActive: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  bgColor = "",
  defaultText,
  changedText,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`rounded-clamp-1vw py-clamp-1vw px-clamp-2vw text-center font-primaryBold text-black shadow-2xl cursor-pointer ${className}`}
      style={{ backgroundColor: bgColor }}
      id="editableElement"
      onClick={onClick}
    >
      {isActive ? changedText : defaultText}
    </div>
  );
};

export default Button;
