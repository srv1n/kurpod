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

// src/colors/yellow.ts
var yellow_exports = {};
__export(yellow_exports, {
  yellow: () => yellow
});
module.exports = __toCommonJS(yellow_exports);
var yellow = {
  50: "#fefce8",
  100: "#fdedd3",
  200: "#fbdba7",
  300: "#f9c97c",
  400: "#f7b750",
  500: "#f5a524",
  600: "#c4841d",
  700: "#936316",
  800: "#62420e",
  900: "#312107"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  yellow
});
