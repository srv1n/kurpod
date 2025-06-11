// src/chevron.tsx
import { jsx } from "react/jsx-runtime";
var ChevronIcon = (props) => /* @__PURE__ */ jsx(
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
        d: "M15.5 19l-7-7 7-7",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5"
      }
    )
  }
);

export {
  ChevronIcon
};
