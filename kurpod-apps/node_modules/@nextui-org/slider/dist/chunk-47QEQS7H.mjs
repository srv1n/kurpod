"use client";
import {
  useSliderThumb
} from "./chunk-4TRUIEJG.mjs";

// src/slider-thumb.tsx
import { forwardRef } from "@nextui-org/system";
import { Tooltip } from "@nextui-org/tooltip";
import { renderFn } from "@nextui-org/react-utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { jsx } from "react/jsx-runtime";
var SliderThumb = forwardRef((props, ref) => {
  const {
    Component,
    index,
    renderThumb,
    showTooltip,
    getTooltipProps,
    getThumbProps,
    getInputProps
  } = useSliderThumb({
    ...props,
    ref
  });
  const thumbProps = {
    ...getThumbProps(),
    index,
    children: /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsx("input", { ...getInputProps() }) })
  };
  const content = renderFn({
    Component,
    props: thumbProps,
    renderCustom: renderThumb
  });
  return showTooltip ? /* @__PURE__ */ jsx(Tooltip, { ...getTooltipProps(), children: content }) : content;
});
SliderThumb.displayName = "NextUI.SliderThumb";
var slider_thumb_default = SliderThumb;

export {
  slider_thumb_default
};
