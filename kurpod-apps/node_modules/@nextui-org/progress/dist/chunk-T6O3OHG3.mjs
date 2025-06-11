"use client";
import {
  useCircularProgress
} from "./chunk-4G6O2UHP.mjs";

// src/circular-progress.tsx
import { forwardRef } from "@nextui-org/system";
import { jsx, jsxs } from "react/jsx-runtime";
var CircularProgress = forwardRef((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    label,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
    getSvgProps,
    getIndicatorProps,
    getTrackProps
  } = useCircularProgress({ ref, ...props });
  const progressBarProps = getProgressBarProps();
  return /* @__PURE__ */ jsxs(Component, { ...progressBarProps, children: [
    /* @__PURE__ */ jsxs("div", { className: slots.svgWrapper({ class: classNames == null ? void 0 : classNames.svgWrapper }), children: [
      /* @__PURE__ */ jsxs("svg", { ...getSvgProps(), children: [
        /* @__PURE__ */ jsx("circle", { ...getTrackProps() }),
        /* @__PURE__ */ jsx("circle", { ...getIndicatorProps() })
      ] }),
      showValueLabel && /* @__PURE__ */ jsx("span", { className: slots.value({ class: classNames == null ? void 0 : classNames.value }), children: progressBarProps["aria-valuetext"] })
    ] }),
    label && /* @__PURE__ */ jsx("span", { ...getLabelProps(), children: label })
  ] });
});
CircularProgress.displayName = "NextUI.CircularProgress";
var circular_progress_default = CircularProgress;

export {
  circular_progress_default
};
