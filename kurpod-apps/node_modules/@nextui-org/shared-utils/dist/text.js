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

// src/text.ts
var text_exports = {};
__export(text_exports, {
  safeAriaLabel: () => safeAriaLabel,
  safeText: () => safeText
});
module.exports = __toCommonJS(text_exports);
var safeText = (text) => {
  if ((text == null ? void 0 : text.length) <= 4)
    return text;
  return text == null ? void 0 : text.slice(0, 3);
};
var safeAriaLabel = (...texts) => {
  let ariaLabel = " ";
  for (const text of texts) {
    if (typeof text === "string" && text.length > 0) {
      ariaLabel = text;
      break;
    }
  }
  return ariaLabel;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  safeAriaLabel,
  safeText
});
