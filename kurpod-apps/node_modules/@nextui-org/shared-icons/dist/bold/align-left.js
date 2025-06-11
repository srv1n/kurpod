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

// src/bold/align-left.tsx
var align_left_exports = {};
__export(align_left_exports, {
  AlignLeftBoldIcon: () => AlignLeftBoldIcon
});
module.exports = __toCommonJS(align_left_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var AlignLeftBoldIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
          d: "M19.3809 15.98V17.02C19.3809 18.61 18.7809 19.25 17.2609 19.25H5.38086V13.75H17.2609C18.7809 13.75 19.3809 14.39 19.3809 15.98Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M14.3809 7.48V8.52C14.3809 10.11 13.7709 10.75 12.2609 10.75H5.38086V5.25H12.2609C13.7709 5.25 14.3809 5.89 14.3809 7.48Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M5.37912 22C4.96912 22 4.62912 21.66 4.62912 21.25V2.75C4.61912 2.33 4.95912 2 5.37912 2C5.79912 2 6.12912 2.34 6.12912 2.75V21.25C6.11912 21.66 5.78912 22 5.37912 22Z",
          fill: "currentColor"
        }
      )
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlignLeftBoldIcon
});
