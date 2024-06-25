import React from "react";

const Header: React.FC = () => {
  return (
    <footer className="flex flex-col justify-center py-clamp-5vh bg-[#FFAFAB] text-white">
      <p className="font-primaryBold text-clamp-2.3vw tracking-clamp-0.8vw mx-auto">
        グリーン・サクセサリー
      </p>
      <p className="font-primaryBold text-clamp-1.8vw mt-clamp-2vh mx-auto">
        Copyright © 2023-2024 グリーン・サクセサリー All Rights Reserved.
      </p>
    </footer>
  );
};

export default Header;
