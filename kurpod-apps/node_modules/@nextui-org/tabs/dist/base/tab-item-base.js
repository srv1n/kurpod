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

// src/base/tab-item-base.ts
var tab_item_base_exports = {};
__export(tab_item_base_exports, {
  default: () => tab_item_base_default
});
module.exports = __toCommonJS(tab_item_base_exports);
var import_aria_utils = require("@nextui-org/aria-utils");
var TabItemBase = import_aria_utils.BaseItem;
var tab_item_base_default = TabItemBase;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
