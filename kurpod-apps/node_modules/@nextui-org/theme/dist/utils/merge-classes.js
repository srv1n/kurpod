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

// src/utils/merge-classes.ts
var merge_classes_exports = {};
__export(merge_classes_exports, {
  mergeClasses: () => mergeClasses
});
module.exports = __toCommonJS(merge_classes_exports);
var import_shared_utils = require("@nextui-org/shared-utils");
var mergeClasses = (itemClasses, itemPropsClasses) => {
  if (!itemClasses && !itemPropsClasses)
    return {};
  const keys = /* @__PURE__ */ new Set([...Object.keys(itemClasses || {}), ...Object.keys(itemPropsClasses || {})]);
  return Array.from(keys).reduce(
    (acc, key) => ({
      ...acc,
      [key]: (0, import_shared_utils.clsx)(itemClasses == null ? void 0 : itemClasses[key], itemPropsClasses == null ? void 0 : itemPropsClasses[key])
    }),
    {}
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeClasses
});
