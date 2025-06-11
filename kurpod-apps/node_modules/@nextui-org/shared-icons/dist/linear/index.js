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

// src/linear/index.ts
var linear_exports = {};
__export(linear_exports, {
  CheckLinearIcon: () => CheckLinearIcon,
  ChevronCircleTopLinearIcon: () => ChevronCircleTopLinearIcon,
  ClockCircleLinearIcon: () => ClockCircleLinearIcon,
  CopyLinearIcon: () => CopyLinearIcon,
  SearchLinearIcon: () => SearchLinearIcon
});
module.exports = __toCommonJS(linear_exports);

// src/linear/check.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var CheckLinearIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    role: "presentation",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
  }
);

// src/linear/copy.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var CopyLinearIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    role: "presentation",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M16 17.1c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9Z" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M8 8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M16 12.9C16 9.4 14.6 8 11.1 8" })
    ]
  }
);

// src/linear/chevron-circle-top.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ChevronCircleTopLinearIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "path",
        {
          d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "10",
          strokeWidth: "1.5"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "path",
        {
          d: "M8.46997 13.26L12 9.73999L15.53 13.26",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1.5"
        }
      )
    ]
  }
);

// src/linear/search.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var SearchLinearIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    role: "presentation",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "path",
        {
          d: "M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M22 22L20 20", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })
    ]
  }
);

// src/linear/clock-circle-linear.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var ClockCircleLinearIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M12 8v4l2.5 2.5", strokeLinecap: "round", strokeLinejoin: "round" })
    ] })
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckLinearIcon,
  ChevronCircleTopLinearIcon,
  ClockCircleLinearIcon,
  CopyLinearIcon,
  SearchLinearIcon
});
