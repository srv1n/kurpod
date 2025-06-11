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

// src/colors/red.ts
var red_exports = {};
__export(red_exports, {
  red: () => red
});
module.exports = __toCommonJS(red_exports);
var red = {
  50: "#fee7ef",
  100: "#fdd0df",
  200: "#faa0bf",
  300: "#f871a0",
  400: "#f54180",
  500: "#f31260",
  600: "#c20e4d",
  700: "#920b3a",
  800: "#610726",
  900: "#310413"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  red
});
