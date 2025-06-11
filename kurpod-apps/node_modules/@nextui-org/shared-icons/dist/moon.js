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

// src/moon.tsx
var moon_exports = {};
__export(moon_exports, {
  MoonIcon: () => MoonIcon
});
module.exports = __toCommonJS(moon_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var MoonIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "svg",
  {
    "aria-hidden": "true",
    focusable: "false",
    height: "1em",
    role: "presentation",
    viewBox: "0 0 512 512",
    width: "1em",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 32
      }
    )
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MoonIcon
});
