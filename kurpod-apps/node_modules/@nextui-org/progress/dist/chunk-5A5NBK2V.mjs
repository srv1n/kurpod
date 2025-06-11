"use client";
import {
  useProgress
} from "./chunk-WXNSGSLR.mjs";

// src/progress.tsx
import { forwardRef } from "@nextui-org/system";
import { jsx, jsxs } from "react/jsx-runtime";
var Progress = forwardRef((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps
  } = useProgress({ ...props, ref });
  const progressBarProps = getProgressBarProps();
  const shouldShowLabelWrapper = label || showValueLabel;
  return /* @__PURE__ */ jsxs(Component, { ...progressBarProps, children: [
    shouldShowLabelWrapper ? /* @__PURE__ */ jsxs("div", { className: slots.labelWrapper({ class: classNames == null ? void 0 : classNames.labelWrapper }), children: [
      label && /* @__PURE__ */ jsx("span", { ...getLabelProps(), children: label }),
      showValueLabel && /* @__PURE__ */ jsx("span", { className: slots.value({ class: classNames == null ? void 0 : classNames.value }), children: progressBarProps["aria-valuetext"] })
    ] }) : null,
    /* @__PURE__ */ jsx("div", { className: slots.track({ class: classNames == null ? void 0 : classNames.track }), children: /* @__PURE__ */ jsx(
      "div",
      {
        className: slots.indicator({ class: classNames == null ? void 0 : classNames.indicator }),
        style: {
          transform: `translateX(-${100 - (percentage || 0)}%)`
        }
      }
    ) })
  ] });
});
Progress.displayName = "NextUI.Progress";
var progress_default = Progress;

export {
  progress_default
};
