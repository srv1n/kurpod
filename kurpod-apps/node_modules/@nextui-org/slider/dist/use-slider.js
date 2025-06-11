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

// src/use-slider.ts
var use_slider_exports = {};
__export(use_slider_exports, {
  useSlider: () => useSlider
});
module.exports = __toCommonJS(use_slider_exports);
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_slider = require("@react-stately/slider");
var import_react = require("react");
var import_i18n = require("@react-aria/i18n");
var import_utils = require("@react-aria/utils");
var import_slider2 = require("@react-aria/slider");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_interactions = require("@react-aria/interactions");
function useSlider(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.slider.variantKeys);
  const {
    ref,
    as,
    name,
    label,
    formatOptions,
    value: valueProp,
    maxValue = 100,
    minValue = 0,
    step = 1,
    showSteps = false,
    showTooltip = false,
    orientation = "horizontal",
    marks = [],
    startContent,
    endContent,
    fillOffset,
    className,
    classNames,
    renderThumb,
    renderLabel,
    renderValue,
    onChange,
    onChangeEnd,
    getValue,
    tooltipValueFormatOptions = formatOptions,
    tooltipProps: userTooltipProps = {},
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const trackRef = (0, import_react.useRef)(null);
  const numberFormatter = (0, import_i18n.useNumberFormatter)(formatOptions);
  const { direction } = (0, import_i18n.useLocale)();
  const clampValue = (0, import_react.useCallback)(
    (valueToClamp) => Math.min(Math.max(valueToClamp, minValue), maxValue),
    [minValue, maxValue]
  );
  const validatedValue = (0, import_react.useMemo)(() => {
    if (valueProp === void 0)
      return void 0;
    if (Array.isArray(valueProp)) {
      return valueProp.map(clampValue);
    }
    return clampValue(valueProp);
  }, [valueProp, clampValue]);
  const state = (0, import_slider.useSliderState)({
    ...otherProps,
    value: validatedValue,
    isDisabled: (_c = originalProps == null ? void 0 : originalProps.isDisabled) != null ? _c : false,
    orientation,
    step,
    minValue,
    maxValue,
    numberFormatter,
    onChange,
    onChangeEnd
  });
  const tooltipProps = {
    offset: 5,
    delay: 0,
    size: "sm",
    showArrow: true,
    color: (originalProps == null ? void 0 : originalProps.color) ? originalProps == null ? void 0 : originalProps.color : (_d = import_theme.slider.defaultVariants) == null ? void 0 : _d.color,
    isDisabled: originalProps.isDisabled,
    ...userTooltipProps
  };
  const { groupProps, trackProps, labelProps, outputProps } = (0, import_slider2.useSlider)(
    originalProps,
    state,
    trackRef
  );
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled: originalProps.isDisabled });
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const isVertical = orientation === "vertical";
  const hasMarks = (marks == null ? void 0 : marks.length) > 0;
  const hasSingleThumb = fillOffset === void 0 ? state.values.length === 1 : false;
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.slider)({
      ...variantProps,
      hasMarks,
      disableAnimation,
      hasSingleThumb,
      isVertical,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), isVertical, disableAnimation, hasSingleThumb, hasMarks, className]
  );
  const [startOffset, endOffset] = [
    state.values.length > 1 ? state.getThumbPercent(0) : fillOffset !== void 0 ? state.getValuePercent(fillOffset) : 0,
    state.getThumbPercent(state.values.length - 1)
  ].sort();
  const value = state.values.length === 1 ? numberFormatter.format(state.values[0]) : numberFormatter.formatRange(state.values[0], state.values[state.values.length - 1]);
  const steps = showSteps ? Math.floor((maxValue - minValue) / step) + 1 : 0;
  const getBaseProps = (props2 = {}) => {
    return {
      ref: domRef,
      "data-orientation": state.orientation,
      "data-slot": "base",
      "data-hover": isHovered,
      className: slots.base({ class: baseStyles }),
      ...(0, import_utils.mergeProps)(
        groupProps,
        hoverProps,
        (0, import_react_utils.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        (0, import_react_utils.filterDOMProps)(props2)
      )
    };
  };
  const getLabelWrapperProps = (props2 = {}) => {
    return {
      className: slots.labelWrapper({ class: classNames == null ? void 0 : classNames.labelWrapper }),
      "data-slot": "labelWrapper",
      ...props2
    };
  };
  const getLabelProps = (props2 = {}) => {
    return {
      "data-slot": "label",
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      children: label,
      ...labelProps,
      ...props2
    };
  };
  const getValueProps = (props2 = {}) => {
    return {
      "data-slot": "value",
      className: slots.value({ class: classNames == null ? void 0 : classNames.value }),
      children: getValue && typeof getValue === "function" ? getValue(state.values) : value,
      ...outputProps,
      ...props2
    };
  };
  const getTrackProps = (props2 = {}) => {
    return {
      ref: trackRef,
      "data-slot": "track",
      "data-thumb-hidden": !!(originalProps == null ? void 0 : originalProps.hideThumb),
      "data-vertical": isVertical,
      className: slots.track({ class: classNames == null ? void 0 : classNames.track }),
      ...trackProps,
      ...props2
    };
  };
  const getTrackWrapperProps = (props2 = {}) => {
    return {
      "data-slot": "track-wrapper",
      className: slots.trackWrapper({ class: classNames == null ? void 0 : classNames.trackWrapper }),
      ...props2
    };
  };
  const getFillerProps = (props2 = {}) => {
    return {
      "data-slot": "filler",
      className: slots.filler({ class: classNames == null ? void 0 : classNames.filler }),
      ...props2,
      style: {
        ...props2.style,
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${startOffset * 100}%`,
        ...isVertical ? {
          height: `${(endOffset - startOffset) * 100}%`
        } : {
          width: `${(endOffset - startOffset) * 100}%`
        }
      }
    };
  };
  const getThumbProps = (index) => {
    return {
      name,
      index,
      state,
      trackRef,
      orientation,
      isVertical,
      tooltipProps,
      showTooltip,
      renderThumb,
      formatOptions: tooltipValueFormatOptions,
      className: slots.thumb({ class: classNames == null ? void 0 : classNames.thumb })
    };
  };
  const getStepProps = (index) => {
    const percent = state.getValuePercent(index * step + minValue);
    return {
      className: slots.step({ class: classNames == null ? void 0 : classNames.step }),
      "data-slot": "step",
      "data-in-range": percent <= endOffset && percent >= startOffset,
      style: {
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${percent * 100}%`
      }
    };
  };
  const getMarkProps = (mark) => {
    const percent = state.getValuePercent(mark.value);
    return {
      className: slots.mark({ class: classNames == null ? void 0 : classNames.mark }),
      "data-slot": "mark",
      "data-in-range": percent <= endOffset && percent >= startOffset,
      style: {
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${percent * 100}%`
      },
      onMouseDown: (e) => e.stopPropagation(),
      onPointerDown: (e) => e.stopPropagation(),
      onClick: (e) => {
        e.stopPropagation();
        if (state.values.length === 1) {
          state.setThumbPercent(0, percent);
        } else {
          const leftThumbVal = state.values[0];
          const rightThumbVal = state.values[1];
          if (mark.value < leftThumbVal) {
            state.setThumbPercent(0, percent);
          } else if (mark.value > rightThumbVal) {
            state.setThumbPercent(1, percent);
          } else if (Math.abs(mark.value - leftThumbVal) < Math.abs(mark.value - rightThumbVal)) {
            state.setThumbPercent(0, percent);
          } else {
            state.setThumbPercent(1, percent);
          }
        }
      }
    };
  };
  const getStartContentProps = (props2 = {}) => ({
    "data-slot": "startContent",
    className: slots.startContent({ class: classNames == null ? void 0 : classNames.startContent }),
    ...props2
  });
  const getEndContentProps = (props2 = {}) => ({
    "data-slot": "endContent",
    className: slots.endContent({ class: classNames == null ? void 0 : classNames.endContent }),
    ...props2
  });
  return {
    Component,
    state,
    value,
    domRef,
    label,
    steps,
    marks,
    startContent,
    endContent,
    getStepProps,
    getBaseProps,
    getValue,
    renderLabel,
    renderValue,
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
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSlider
});
