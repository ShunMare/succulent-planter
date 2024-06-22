import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { generateClampStyle, generateMediaQueriesForValues } from "./utils/clampGenerator.mjs";
import { colors, backgroundImage, fontFamily, boxShadow } from "./utils/globals.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const deviceWidth = 768;
const deviceHeight = 808;

const remBase = 16;

const vhInPixels = deviceHeight * 0.01;
const vwInPixels = deviceWidth * 0.01;

const vhInRem = vhInPixels / remBase;
const vwInRem = vwInPixels / remBase;

const values = [
  0.3, 0.5, 0.6, 0.7, 0.9, 1, 1.2, 1.4, 2.4, 2.92, 3, 3.33, 3.8, 4, 5.3, 5.8, 6,
  6.9, 7, 7.3, 7.5, 8, 8.2, 8.5, 8.6, 8.8, 9.8, 10.2, 11, 12, 12.2, 12.5, 13,
  15, 16, 17, 17.7, 19.5, 20, 21, 22, 22.2, 22.5, 23, 27.7, 29.5, 30.7, 34,
  34.7, 35.6, 37.5, 40, 51.5, 51.7, 54, 54.2, 54.5, 55.9, 56.8, 57.2, 70, 84,
];

const vhSpacing = generateClampStyle(0, 200, 0.1, "vh", vhInRem);
const vwSpacing1 = generateClampStyle(2.92, 2.92, 0.1, "vw", vwInRem);
const vwSpacing2 = generateClampStyle(0, 200, 0.1, "vw", vwInRem);
const vwSpacing3 = generateClampStyle(3.33, 3.33, 0.1, "vw", vwInRem);

const spacing = { ...vhSpacing, ...vwSpacing1, ...vwSpacing2, ...vwSpacing3 };

const tailwindConfig = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: spacing,
      fontSize: spacing,
      letterSpacing: spacing,
      margin: spacing,
      padding: spacing,
      gap: spacing,
      width: spacing,
      height: spacing,
      borderWidth: spacing,
      lineHeight: spacing,
      borderRadius: spacing,
      colors: colors,
      backgroundImage: backgroundImage,
      fontFamily: fontFamily,
      boxShadow: boxShadow,
    },
  },
  plugins: [],
};

const configString = `/** @type {import('tailwindcss').Config} */\n\nexport default ${JSON.stringify(
  tailwindConfig,
  null,
  2
)};`;

writeFileSync(join(__dirname, "tailwind.config.mjs"), configString, "utf8");

console.log("tailwind.config.mjs has been generated!");

const mediaQueriesForValues = generateMediaQueriesForValues(
  values,
  vwInRem,
  vhInRem
);
const combinedMediaQueries = mediaQueriesForValues;

writeFileSync(
  join(__dirname, "./styles/clamps.css"),
  combinedMediaQueries,
  "utf8"
);

console.log("clamps.css has been generated!");
