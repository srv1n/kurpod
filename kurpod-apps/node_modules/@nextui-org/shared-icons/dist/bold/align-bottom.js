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

// src/bold/align-bottom.tsx
var align_bottom_exports = {};
__export(align_bottom_exports, {
  AlignBottomBoldIcon: () => AlignBottomBoldIcon
});
module.exports = __toCommonJS(align_bottom_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var AlignBottomBoldIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
          d: "M8.02 4.62109H6.98C5.39 4.62109 4.75 5.22109 4.75 6.74109V18.6211H10.25V6.74109C10.24 5.22109 9.6 4.62109 8.02 4.62109Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M16.52 9.62109H15.48C13.89 9.62109 13.25 10.2311 13.25 11.7411V18.6211H18.75V11.7411C18.75 10.2311 18.1 9.62109 16.52 9.62109Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M2.75 17.8789H21.25C21.66 17.8789 22 18.2189 22 18.6289C22 19.0389 21.66 19.3789 21.25 19.3789H2.75C2.34 19.3789 2 19.0389 2 18.6189C2 18.1989 2.34 17.8789 2.75 17.8789Z",
          fill: "currentColor"
        }
      )
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlignBottomBoldIcon
});
