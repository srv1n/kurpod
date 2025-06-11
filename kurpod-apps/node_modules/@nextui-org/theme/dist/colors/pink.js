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

// src/colors/pink.ts
var pink_exports = {};
__export(pink_exports, {
  pink: () => pink
});
module.exports = __toCommonJS(pink_exports);
var pink = {
  50: "#ffedfa",
  100: "#ffdcf5",
  200: "#ffb8eb",
  300: "#ff95e1",
  400: "#ff71d7",
  500: "#ff4ecd",
  600: "#cc3ea4",
  700: "#992f7b",
  800: "#661f52",
  900: "#331029"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pink
});
