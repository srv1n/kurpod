"use client";

// src/dimensions.ts
var getCSSStyleVal = (str, parentNum) => {
  if (!str)
    return 0;
  const strVal = str.includes("px") ? +str.split("px")[0] : str.includes("%") ? +str.split("%")[0] * parentNum * 0.01 : str;
  return Number.isNaN(+strVal) ? 0 : +strVal;
};
var getRealShape = (el) => {
  const defaultShape = { width: 0, height: 0 };
  if (!el || typeof window === "undefined")
    return defaultShape;
  const rect = el.getBoundingClientRect();
  const { width, height } = window.getComputedStyle(el);
  return {
    width: getCSSStyleVal(`${width}`, rect.width),
    height: getCSSStyleVal(`${height}`, rect.height)
  };
};

export {
  getCSSStyleVal,
  getRealShape
};
