"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/dimensions.ts
var dimensions_exports = {};
__export(dimensions_exports, {
  getCSSStyleVal: () => getCSSStyleVal,
  getRealShape: () => getRealShape
});
module.exports = __toCommonJS(dimensions_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCSSStyleVal,
  getRealShape
});
