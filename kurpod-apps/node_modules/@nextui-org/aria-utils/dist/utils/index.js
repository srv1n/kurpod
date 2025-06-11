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

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  isCtrlKeyPressed: () => isCtrlKeyPressed,
  isNonContiguousSelectionModifier: () => isNonContiguousSelectionModifier
});
module.exports = __toCommonJS(utils_exports);
var import_utils = require("@react-aria/utils");
var import_utils2 = require("@react-aria/utils");
function isNonContiguousSelectionModifier(e) {
  return (0, import_utils.isAppleDevice)() ? e.altKey : e.ctrlKey;
}
function isCtrlKeyPressed(e) {
  if ((0, import_utils2.isMac)()) {
    return e.metaKey;
  }
  return e.ctrlKey;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isCtrlKeyPressed,
  isNonContiguousSelectionModifier
});
