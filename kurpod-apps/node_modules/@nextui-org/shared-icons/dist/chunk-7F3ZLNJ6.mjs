// src/chevron-down.tsx
import { jsx } from "react/jsx-runtime";
var ChevronDownIcon = ({ strokeWidth = 1.5, ...props }) => /* @__PURE__ */ jsx(
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
    strokeWidth,
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
  }
);

export {
  ChevronDownIcon
};
