// src/linear/clock-circle-linear.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ClockCircleLinearIcon = (props) => /* @__PURE__ */ jsx(
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
    children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("path", { d: "M12 8v4l2.5 2.5", strokeLinecap: "round", strokeLinejoin: "round" })
    ] })
  }
);

export {
  ClockCircleLinearIcon
};
