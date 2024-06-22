// src/utils/clampGenerator.js
import { formatNumber } from "./utils.mjs";

export function generateClampStyle(min, max, step, unit, remFactor) {
  const clampStyle = {};
  for (let i = min; i <= max; i = Math.round((i + step) * 100) / 100) {
    const formattedKey = formatNumber(i);
    const key = `clamp-${formattedKey}${unit}`;
    const value = `clamp(0rem, ${i.toFixed(2).replace(/\.?0+$/, "")}${unit}, ${(
      i * remFactor
    )
      .toFixed(3)
      .replace(/\.?0+$/, "")}rem)`;
    clampStyle[key] = value;
  }
  return clampStyle;
}

export function generateSingleMediaQuery(vw, vwInRem, vhInRem) {
  let mediaQueries = "";
  const properties = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    text: "font-size",
    w: "width",
    mt: "margin-top",
    ml: "margin-left",
    leading: "line-height",
    tracking: "letter-spacing",
  };

  const vwFormatted = formatNumber(vw);
  const remValueVW = (vw * vwInRem).toFixed(3);
  const correspondingVH = (remValueVW / vhInRem).toFixed(1);

  Object.entries(properties).forEach(([propClass, propCSS]) => {
    const className = `${propClass}-clamp-${vwFormatted.replace(
      ".",
      "\\.",
    )}vw-${correspondingVH.replace(".", "\\.")}vh`;
    const mediaQuery = `
@media (min-aspect-ratio: ${correspondingVH}/${vwFormatted}) {
  .${className} {
    ${propCSS}: clamp(0rem, ${correspondingVH}vh, ${remValueVW}rem);
  }
  .-${className} {
    ${propCSS}: calc(clamp(0rem, ${correspondingVH}vh, ${remValueVW}rem) * -1);
  }
}
@media (max-aspect-ratio: ${correspondingVH}/${vwFormatted}) {
  .${className} {
    ${propCSS}: clamp(0rem, ${vwFormatted}vw, ${remValueVW}rem);
  }
  .-${className} {
    ${propCSS}: calc(clamp(0rem, ${vwFormatted}vw, ${remValueVW}rem) * -1);
  }
}`;
    mediaQueries += mediaQuery;
  });

  return mediaQueries;
}

export function generateMediaQueriesForValues(values, vwInRem, vhInRem) {
  let mediaQueries = "";
  values.forEach((vw) => {
    mediaQueries += generateSingleMediaQuery(vw, vwInRem, vhInRem);
  });
  return mediaQueries;
}
