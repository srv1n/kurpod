// src/chevron-up.tsx
import { jsx } from "react/jsx-runtime";
var ChevronUpIcon = ({ strokeWidth = 1.5, ...props }) => /* @__PURE__ */ jsx(
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
    children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" })
  }
);

export {
  ChevronUpIcon
};
