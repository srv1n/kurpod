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

// src/sun.tsx
var sun_exports = {};
__export(sun_exports, {
  SunIcon: () => SunIcon
});
module.exports = __toCommonJS(sun_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var SunIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "svg",
  {
    "aria-hidden": "true",
    focusable: "false",
    height: "1em",
    role: "presentation",
    viewBox: "0 0 512 512",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94",
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeMiterlimit: 10,
          strokeWidth: 32
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "circle",
        {
          cx: 256,
          cy: 256,
          fill: "none",
          r: 80,
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeMiterlimit: 10,
          strokeWidth: 32
        }
      )
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SunIcon
});
