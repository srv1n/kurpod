// src/selector.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SelectorIcon = (props) => /* @__PURE__ */ jsxs(
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
      /* @__PURE__ */ jsx("path", { d: "M0 0h24v24H0z", fill: "none", stroke: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M8 9l4 -4l4 4" }),
      /* @__PURE__ */ jsx("path", { d: "M16 15l-4 4l-4 -4" })
    ]
  }
);

export {
  SelectorIcon
};
