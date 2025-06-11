// src/ellipsis.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var EllipsisIcon = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    height: "1em",
    shapeRendering: "geometricPrecision",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", fill: "currentColor", r: "1" }),
      /* @__PURE__ */ jsx("circle", { cx: "19", cy: "12", fill: "currentColor", r: "1" }),
      /* @__PURE__ */ jsx("circle", { cx: "5", cy: "12", fill: "currentColor", r: "1" })
    ]
  }
);

export {
  EllipsisIcon
};
