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

// src/colors/blue.ts
var blue_exports = {};
__export(blue_exports, {
  blue: () => blue
});
module.exports = __toCommonJS(blue_exports);
var blue = {
  50: "#e6f1fe",
  100: "#cce3fd",
  200: "#99c7fb",
  300: "#66aaf9",
  400: "#338ef7",
  500: "#006FEE",
  600: "#005bc4",
  700: "#004493",
  800: "#002e62",
  900: "#001731"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blue
});
