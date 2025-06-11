"use client";

// src/chevron-down.tsx
import { jsx } from "react/jsx-runtime";
var ChevronDownIcon = (props) => /* @__PURE__ */ jsx(
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
    children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M19 9L12 15L5 9",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5"
      }
    )
  }
);

export {
  ChevronDownIcon
};
