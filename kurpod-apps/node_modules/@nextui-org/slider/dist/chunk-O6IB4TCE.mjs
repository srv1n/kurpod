"use client";
import {
  slider_thumb_default
} from "./chunk-47QEQS7H.mjs";
import {
  useSlider
} from "./chunk-XHXFV6S5.mjs";

// src/slider.tsx
import { renderFn } from "@nextui-org/react-utils";
import { forwardRef } from "@nextui-org/system";
import { jsx, jsxs } from "react/jsx-runtime";
var Slider = forwardRef((props, ref) => {
  const {
    Component,
    state,
    label,
    steps,
    marks,
    startContent,
    endContent,
    getStepProps,
    getBaseProps,
    renderValue,
    renderLabel,
    getTrackWrapperProps,
    getLabelWrapperProps,
    getLabelProps,
    getValueProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
    getMarkProps,
    getStartContentProps,
    getEndContentProps
  } = useSlider({ ...props, ref });
  return /* @__PURE__ */ jsxs(Component, { ...getBaseProps(), children: [
    label && /* @__PURE__ */ jsxs("div", { ...getLabelWrapperProps(), children: [
      renderFn({
        Component: "label",
        props: getLabelProps(),
        renderCustom: renderLabel
      }),
      renderFn({
        Component: "output",
        props: getValueProps(),
        renderCustom: renderValue
      })
    ] }),
    /* @__PURE__ */ jsxs("div", { ...getTrackWrapperProps(), children: [
      startContent && /* @__PURE__ */ jsx("div", { ...getStartContentProps(), children: startContent }),
      /* @__PURE__ */ jsxs("div", { ...getTrackProps(), children: [
        /* @__PURE__ */ jsx("div", { ...getFillerProps() }),
        Number.isFinite(steps) && Array.from({ length: steps }, (_, index) => /* @__PURE__ */ jsx("div", { ...getStepProps(index) }, index)),
        state.values.map((_, index) => /* @__PURE__ */ jsx(slider_thumb_default, { ...getThumbProps(index) }, index)),
        (marks == null ? void 0 : marks.length) > 0 && marks.map((mark, index) => /* @__PURE__ */ jsx("div", { ...getMarkProps(mark), children: mark.label }, index))
      ] }),
      endContent && /* @__PURE__ */ jsx("div", { ...getEndContentProps(), children: endContent })
    ] })
  ] });
});
Slider.displayName = "NextUI.Slider";
var slider_default = Slider;

export {
  slider_default
};
