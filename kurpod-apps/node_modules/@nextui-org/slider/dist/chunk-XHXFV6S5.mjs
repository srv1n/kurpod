"use client";

// src/use-slider.ts
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { slider } from "@nextui-org/theme";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { useSliderState } from "@react-stately/slider";
import { useCallback, useMemo, useRef } from "react";
import { useNumberFormatter, useLocale } from "@react-aria/i18n";
import { mergeProps } from "@react-aria/utils";
import { useSlider as useAriaSlider } from "@react-aria/slider";
import { clsx, objectToDeps } from "@nextui-org/shared-utils";
import { useHover } from "@react-aria/interactions";
function useSlider(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, slider.variantKeys);
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
  const domRef = useDOMRef(ref);
  const trackRef = useRef(null);
  const numberFormatter = useNumberFormatter(formatOptions);
  const { direction } = useLocale();
  const clampValue = useCallback(
    (valueToClamp) => Math.min(Math.max(valueToClamp, minValue), maxValue),
    [minValue, maxValue]
  );
  const validatedValue = useMemo(() => {
    if (valueProp === void 0)
      return void 0;
    if (Array.isArray(valueProp)) {
      return valueProp.map(clampValue);
    }
    return clampValue(valueProp);
  }, [valueProp, clampValue]);
  const state = useSliderState({
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
    color: (originalProps == null ? void 0 : originalProps.color) ? originalProps == null ? void 0 : originalProps.color : (_d = slider.defaultVariants) == null ? void 0 : _d.color,
    isDisabled: originalProps.isDisabled,
    ...userTooltipProps
  };
  const { groupProps, trackProps, labelProps, outputProps } = useAriaSlider(
    originalProps,
    state,
    trackRef
  );
  const { isHovered, hoverProps } = useHover({ isDisabled: originalProps.isDisabled });
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const isVertical = orientation === "vertical";
  const hasMarks = (marks == null ? void 0 : marks.length) > 0;
  const hasSingleThumb = fillOffset === void 0 ? state.values.length === 1 : false;
  const slots = useMemo(
    () => slider({
      ...variantProps,
      hasMarks,
      disableAnimation,
      hasSingleThumb,
      isVertical,
      className
    }),
    [objectToDeps(variantProps), isVertical, disableAnimation, hasSingleThumb, hasMarks, className]
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
      ...mergeProps(
        groupProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        filterDOMProps(props2)
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

export {
  useSlider
};
