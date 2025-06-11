"use client";

// src/use-slider-thumb.ts
import { useSliderThumb as useAriaSliderThumb } from "@react-aria/slider";
import { useDOMRef } from "@nextui-org/react-utils";
import { useRef } from "react";
import { useHover, usePress } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { dataAttr } from "@nextui-org/shared-utils";
import { useNumberFormatter } from "@react-aria/i18n";
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
  const domRef = useDOMRef(ref);
  const inputRef = useRef(null);
  const numberFormatter = useNumberFormatter(formatOptions);
  const { thumbProps, inputProps, isDragging, isFocused } = useAriaSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
      ...otherProps
    },
    state
  );
  const { hoverProps, isHovered } = useHover({
    isDisabled: state.isDisabled
  });
  const { focusProps, isFocusVisible } = useFocusRing();
  const { pressProps, isPressed } = usePress({
    isDisabled: state.isDisabled
  });
  const getThumbProps = (props2 = {}) => {
    return {
      ref: domRef,
      "data-slot": "thumb",
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-dragging": dataAttr(isDragging),
      "data-focused": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(thumbProps, pressProps, hoverProps, otherProps),
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
      ...mergeProps(inputProps, focusProps),
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

export {
  useSliderThumb
};
