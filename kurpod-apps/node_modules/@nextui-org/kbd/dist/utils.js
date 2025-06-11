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

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  kbdKeysLabelMap: () => kbdKeysLabelMap,
  kbdKeysMap: () => kbdKeysMap
});
module.exports = __toCommonJS(utils_exports);
var kbdKeysMap = {
  command: "\u2318",
  shift: "\u21E7",
  ctrl: "\u2303",
  option: "\u2325",
  enter: "\u21B5",
  delete: "\u232B",
  escape: "\u238B",
  tab: "\u21E5",
  capslock: "\u21EA",
  up: "\u2191",
  right: "\u2192",
  down: "\u2193",
  left: "\u2190",
  pageup: "\u21DE",
  pagedown: "\u21DF",
  home: "\u2196",
  end: "\u2198",
  help: "?",
  space: "\u2423"
};
var kbdKeysLabelMap = {
  command: "Command",
  shift: "Shift",
  ctrl: "Control",
  option: "Option",
  enter: "Enter",
  delete: "Delete",
  escape: "Escape",
  tab: "Tab",
  capslock: "Caps Lock",
  up: "Up",
  right: "Right",
  down: "Down",
  left: "Left",
  pageup: "Page Up",
  pagedown: "Page Down",
  home: "Home",
  end: "End",
  help: "Help",
  space: "Space"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  kbdKeysLabelMap,
  kbdKeysMap
});
