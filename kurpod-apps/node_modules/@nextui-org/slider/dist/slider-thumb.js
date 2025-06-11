"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/slider-thumb.tsx
var slider_thumb_exports = {};
__export(slider_thumb_exports, {
  default: () => slider_thumb_default
});
module.exports = __toCommonJS(slider_thumb_exports);
var import_system = require("@nextui-org/system");
var import_tooltip = require("@nextui-org/tooltip");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_visually_hidden = require("@react-aria/visually-hidden");

// src/use-slider-thumb.ts
var import_slider = require("@react-aria/slider");
var import_react_utils = require("@nextui-org/react-utils");
var import_react = require("react");
var import_interactions = require("@react-aria/interactions");
var import_focus = require("@react-aria/focus");
var import_utils = require("@react-aria/utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_i18n = require("@react-aria/i18n");
function useSliderThumb(props) {
  const {
    ref,
    as,
    state,
    index,
    name,
    trackRef,
    className,
    tooltipProps,
    isVertical,
    showTooltip,
    formatOptions,
    renderThumb,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const inputRef = (0, import_react.useRef)(null);
  const numberFormatter = (0, import_i18n.useNumberFormatter)(formatOptions);
  const { thumbProps, inputProps, isDragging, isFocused } = (0, import_slider.useSliderThumb)(
    {
      index,
      trackRef,
      inputRef,
      name,
      ...otherProps
    },
    state
  );
  const { hoverProps, isHovered } = (0, import_interactions.useHover)({
    isDisabled: state.isDisabled
  });
  const { focusProps, isFocusVisible } = (0, import_focus.useFocusRing)();
  const { pressProps, isPressed } = (0, import_interactions.usePress)({
    isDisabled: state.isDisabled
  });
  const getThumbProps = (props2 = {}) => {
    return {
      ref: domRef,
      "data-slot": "thumb",
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
      "data-dragging": (0, import_shared_utils.dataAttr)(isDragging),
      "data-focused": (0, import_shared_utils.dataAttr)(isFocused),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      ...(0, import_utils.mergeProps)(thumbProps, pressProps, hoverProps, otherProps),
      className,
      ...props2
    };
  };
  const getTooltipProps = () => {
    const value = numberFormatter ? numberFormatter.format(state.values[index != null ? index : 0]) : state.values[index != null ? index : 0];
    return {
      ...tooltipProps,
      placement: (tooltipProps == null ? void 0 : tooltipProps.placement) ? tooltipProps == null ? void 0 : tooltipProps.placement : isVertical ? "right" : "top",
      content: (tooltipProps == null ? void 0 : tooltipProps.content) ? tooltipProps == null ? void 0 : tooltipProps.content : value,
      updatePositionDeps: [isDragging, isHovered, value],
      isOpen: (tooltipProps == null ? void 0 : tooltipProps.isOpen) !== void 0 ? tooltipProps == null ? void 0 : tooltipProps.isOpen : isHovered || isDragging
    };
  };
  const getInputProps = (props2 = {}) => {
    return {
      ref: inputRef,
      ...(0, import_utils.mergeProps)(inputProps, focusProps),
      ...props2
    };
  };
  return {
    Component,
    index,
    showTooltip,
    renderThumb,
    getThumbProps,
    getTooltipProps,
    getInputProps
  };
}

// src/slider-thumb.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SliderThumb = (0, import_system.forwardRef)((props, ref) => {
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
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_visually_hidden.VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...getInputProps() }) })
  };
  const content = (0, import_react_utils2.renderFn)({
    Component,
    props: thumbProps,
    renderCustom: renderThumb
  });
  return showTooltip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tooltip.Tooltip, { ...getTooltipProps(), children: content }) : content;
});
SliderThumb.displayName = "NextUI.SliderThumb";
var slider_thumb_default = SliderThumb;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
