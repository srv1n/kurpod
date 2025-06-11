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

// src/colors/cyan.ts
var cyan_exports = {};
__export(cyan_exports, {
  cyan: () => cyan
});
module.exports = __toCommonJS(cyan_exports);
var cyan = {
  50: "#F0FCFF",
  100: "#E6FAFE",
  200: "#D7F8FE",
  300: "#C3F4FD",
  400: "#A5EEFD",
  500: "#7EE7FC",
  600: "#06B7DB",
  700: "#09AACD",
  800: "#0E8AAA",
  900: "#053B48"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cyan
});
