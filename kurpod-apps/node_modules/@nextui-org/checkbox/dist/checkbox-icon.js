"use client";
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

// src/checkbox-icon.tsx
var checkbox_icon_exports = {};
__export(checkbox_icon_exports, {
  CheckboxIcon: () => CheckboxIcon
});
module.exports = __toCommonJS(checkbox_icon_exports);
var import_jsx_runtime = require("react/jsx-runtime");
function CheckIcon(props) {
  const { isSelected, disableAnimation, ...otherProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", role: "presentation", viewBox: "0 0 17 18", ...otherProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "polyline",
    {
      fill: "none",
      points: "1 9 7 14 15 4",
      stroke: "currentColor",
      strokeDasharray: 22,
      strokeDashoffset: isSelected ? 44 : 66,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      style: !disableAnimation && isSelected ? {
        transition: "stroke-dashoffset 250ms linear 0.2s"
      } : {}
    }
  ) });
}
function IndeterminateIcon(props) {
  const { isSelected, disableAnimation, ...otherProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { stroke: "currentColor", strokeWidth: 3, viewBox: "0 0 24 24", ...otherProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "21", x2: "3", y1: "12", y2: "12" }) });
}
function CheckboxIcon(props) {
  const { isIndeterminate, ...otherProps } = props;
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseIcon, { ...otherProps });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckboxIcon
});
