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

// src/bold/align-vertically.tsx
var align_vertically_exports = {};
__export(align_vertically_exports, {
  AlignVerticallyBoldIcon: () => AlignVerticallyBoldIcon
});
module.exports = __toCommonJS(align_vertically_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var AlignVerticallyBoldIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
          d: "M17.4 19.25H6.6C5.1 19.25 4.5 18.61 4.5 17.02V15.98C4.5 14.39 5.1 13.75 6.6 13.75H17.4C18.9 13.75 19.5 14.39 19.5 15.98V17.02C19.5 18.61 18.9 19.25 17.4 19.25Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M12.75 19.25V21.25C12.75 21.66 12.41 22 12 22C11.59 22 11.25 21.66 11.25 21.25V19.25H12.75Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.75 10.75H11.25V13.75H12.75V10.75Z", fill: "currentColor" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M12.75 2.75V5.25H11.25V2.75C11.25 2.34 11.59 2 12 2C12.41 2 12.75 2.34 12.75 2.75Z",
          fill: "currentColor"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M15.4 10.75H8.6C7.1 10.75 6.5 10.11 6.5 8.52V7.48C6.5 5.89 7.1 5.25 8.6 5.25H15.4C16.9 5.25 17.5 5.89 17.5 7.48V8.52C17.5 10.11 16.9 10.75 15.4 10.75Z",
          fill: "currentColor"
        }
      )
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlignVerticallyBoldIcon
});
