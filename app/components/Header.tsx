import React from "react";
import getConfig from "next/config";

const Header: React.FC = () => {
  const showButtons = process.env.SHOW_BUTTONS === "true";

  return (
    <>
      {!showButtons && (
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZHSWFQ3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      )}
      <header className="absolute w-full z-10">
        <div className="flex justify-center py-clamp-5vh bg-[#FFAFAB] text-white tracking-clamp-0.8vw">
          <a href="/">
            <p className="font-primaryBold text-clamp-3.5vw">
              グリーン・サクセサリー
            </p>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
