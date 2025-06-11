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

// src/bold/align-top.tsx
var align_top_exports = {};
__export(align_top_exports, {
  AlignTopBoldIcon: () => AlignTopBoldIcon
});
module.exports = __toCommonJS(align_top_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var AlignTopBoldIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
          d: "M15.98 19.3789H17.02C18.61 19.3789 19.25 18.7789 19.25 17.2589V5.37891H13.75V17.2589C13.76 18.7789 14.4 19.3789 15.98 19.3789Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M7.48 14.3789H8.52C10.11 14.3789 10.75 13.7689 10.75 12.2589V5.37891H5.25V12.2589C5.26 13.7689 5.9 14.3789 7.48 14.3789Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M21.25 6.11891H2.75C2.34 6.11891 2 5.78891 2 5.37891C2 4.96891 2.34 4.62891 2.75 4.62891H21.25C21.66 4.62891 22 4.96891 22 5.37891C22 5.78891 21.66 6.11891 21.25 6.11891Z",
          fill: "currentColor"
        }
      )
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlignTopBoldIcon
});
