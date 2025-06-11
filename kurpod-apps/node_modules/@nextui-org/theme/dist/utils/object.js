"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/object.ts
var object_exports = {};
__export(object_exports, {
  flattenThemeObject: () => flattenThemeObject,
  removeDefaultKeys: () => removeDefaultKeys,
  swapColorValues: () => swapColorValues
});
module.exports = __toCommonJS(object_exports);
var import_flat = __toESM(require("flat"));
function swapColorValues(colors) {
  const swappedColors = {};
  const keys = Object.keys(colors);
  const length = keys.length;
  for (let i = 0; i < length / 2; i++) {
    const key1 = keys[i];
    const key2 = keys[length - 1 - i];
    swappedColors[key1] = colors[key2];
    swappedColors[key2] = colors[key1];
  }
  if (length % 2 !== 0) {
    const middleKey = keys[Math.floor(length / 2)];
    swappedColors[middleKey] = colors[middleKey];
  }
  return swappedColors;
}
function removeDefaultKeys(obj) {
  const newObj = {};
  for (const key in obj) {
    if (key.endsWith("-DEFAULT")) {
      newObj[key.replace("-DEFAULT", "")] = obj[key];
      continue;
    }
    newObj[key] = obj[key];
  }
  return newObj;
}
var flattenThemeObject = (obj) => removeDefaultKeys(
  (0, import_flat.default)(obj, {
    safe: true,
    delimiter: "-"
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  flattenThemeObject,
  removeDefaultKeys,
  swapColorValues
});
