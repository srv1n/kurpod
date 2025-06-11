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

// src/bold/align-right.tsx
var align_right_exports = {};
__export(align_right_exports, {
  AlignRightBoldIcon: () => AlignRightBoldIcon
});
module.exports = __toCommonJS(align_right_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var AlignRightBoldIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    role: "presentation",
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M4.61914 15.98V17.02C4.61914 18.61 5.21914 19.25 6.73914 19.25H18.6191V13.75H6.73914C5.21914 13.75 4.61914 14.39 4.61914 15.98Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M9.61914 7.48V8.52C9.61914 10.11 10.2291 10.75 11.7391 10.75H18.6191V5.25H11.7391C10.2291 5.25 9.61914 5.89 9.61914 7.48Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M18.6191 22C18.2091 22 17.8691 21.66 17.8691 21.25V2.75C17.8691 2.34 18.2091 2 18.6191 2C19.0291 2 19.3691 2.34 19.3691 2.75V21.25C19.3791 21.66 19.0391 22 18.6191 22Z",
          fill: "currentColor"
        }
      )
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlignRightBoldIcon
});
