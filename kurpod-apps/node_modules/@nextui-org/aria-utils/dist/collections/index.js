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

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  BaseItem: () => import_collections.Item,
  BaseSection: () => import_collections2.Section
});
module.exports = __toCommonJS(collections_exports);

// src/collections/item.ts
var import_collections = require("@react-stately/collections");

// src/collections/section.ts
var import_collections2 = require("@react-stately/collections");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseItem,
  BaseSection
});
