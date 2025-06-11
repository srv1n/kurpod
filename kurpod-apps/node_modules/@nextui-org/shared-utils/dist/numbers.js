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

// src/numbers.ts
var numbers_exports = {};
__export(numbers_exports, {
  clamp: () => clamp,
  clampPercentage: () => clampPercentage,
  range: () => range
});
module.exports = __toCommonJS(numbers_exports);
function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function clampPercentage(value, max = 100) {
  return Math.min(Math.max(value, 0), max);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clamp,
  clampPercentage,
  range
});
