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

// src/colors/purple.ts
var purple_exports = {};
__export(purple_exports, {
  purple: () => purple
});
module.exports = __toCommonJS(purple_exports);
var purple = {
  50: "#f2eafa",
  100: "#e4d4f4",
  200: "#c9a9e9",
  300: "#ae7ede",
  400: "#9353d3",
  500: "#7828c8",
  600: "#6020a0",
  700: "#481878",
  800: "#301050",
  900: "#180828"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  purple
});
