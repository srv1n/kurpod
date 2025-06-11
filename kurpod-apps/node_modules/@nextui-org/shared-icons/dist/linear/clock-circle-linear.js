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

// src/linear/clock-circle-linear.tsx
var clock_circle_linear_exports = {};
__export(clock_circle_linear_exports, {
  ClockCircleLinearIcon: () => ClockCircleLinearIcon
});
module.exports = __toCommonJS(clock_circle_linear_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var ClockCircleLinearIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8v4l2.5 2.5", strokeLinecap: "round", strokeLinejoin: "round" })
    ] })
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClockCircleLinearIcon
});
