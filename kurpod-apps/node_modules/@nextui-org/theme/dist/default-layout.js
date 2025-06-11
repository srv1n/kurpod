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

// src/default-layout.ts
var default_layout_exports = {};
__export(default_layout_exports, {
  darkLayout: () => darkLayout,
  defaultLayout: () => defaultLayout,
  lightLayout: () => lightLayout
});
module.exports = __toCommonJS(default_layout_exports);
var defaultLayout = {
  dividerWeight: "1px",
  disabledOpacity: ".5",
  fontSize: {
    tiny: "0.75rem",
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem"
  },
  lineHeight: {
    tiny: "1rem",
    small: "1.25rem",
    medium: "1.5rem",
    large: "1.75rem"
  },
  radius: {
    small: "8px",
    medium: "12px",
    large: "14px"
  },
  borderWidth: {
    small: "1px",
    medium: "2px",
    large: "3px"
  },
  boxShadow: {
    small: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    medium: "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    large: "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)"
  }
};
var lightLayout = {
  hoverOpacity: ".8"
};
var darkLayout = {
  hoverOpacity: ".9",
  boxShadow: {
    small: "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
    medium: "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
    large: "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  darkLayout,
  defaultLayout,
  lightLayout
});
