"use client";

// src/checkbox-icon.tsx
import { jsx } from "react/jsx-runtime";
function CheckIcon(props) {
  const { isSelected, disableAnimation, ...otherProps } = props;
  return /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", role: "presentation", viewBox: "0 0 17 18", ...otherProps, children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx("svg", { stroke: "currentColor", strokeWidth: 3, viewBox: "0 0 24 24", ...otherProps, children: /* @__PURE__ */ jsx("line", { x1: "21", x2: "3", y1: "12", y2: "12" }) });
}
function CheckboxIcon(props) {
  const { isIndeterminate, ...otherProps } = props;
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon;
  return /* @__PURE__ */ jsx(BaseIcon, { ...otherProps });
}

export {
  CheckboxIcon
};
