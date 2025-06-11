"use client";

// src/use-circular-progress.ts
import { mapPropsVariants, useProviderContext } from "@nextui-org/system";
import { circularProgress } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clampPercentage, clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
import { useMemo, useCallback } from "react";
import { useIsMounted } from "@nextui-org/use-is-mounted";
import { useProgressBar as useAriaProgress } from "@react-aria/progress";
function useCircularProgress(originalProps) {
  var _a, _b, _c;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, circularProgress.variantKeys);
  const {
    ref,
    as,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = void 0,
    minValue = 0,
    maxValue = 100,
    strokeWidth: strokeWidthProp,
    showValueLabel = false,
    formatOptions = {
      style: "percent"
    },
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const [, isMounted] = useIsMounted({
    rerender: true,
    delay: 100
  });
  const isIndeterminate = ((_a = originalProps.isIndeterminate) != null ? _a : true) && value === void 0;
  const disableAnimation = (_c = (_b = originalProps.disableAnimation) != null ? _b : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _c : false;
  const { progressBarProps, labelProps } = useAriaProgress({
    id,
    label,
    value,
    minValue,
    maxValue,
    valueLabel,
    formatOptions,
    isIndeterminate,
    "aria-labelledby": originalProps["aria-labelledby"],
    "aria-label": originalProps["aria-label"]
  });
  const slots = useMemo(
    () => circularProgress({
      ...variantProps,
      disableAnimation,
      isIndeterminate
    }),
    [objectToDeps(variantProps), disableAnimation, isIndeterminate]
  );
  const selfMounted = disableAnimation ? true : isMounted;
  const center = 16;
  const strokeWidth = strokeWidthProp || (originalProps.size === "sm" ? 2 : 3);
  const radius = 16 - strokeWidth;
  const circumference = 2 * radius * Math.PI;
  const percentage = useMemo(() => {
    if (!selfMounted) {
      return 0;
    }
    if (isIndeterminate) {
      return 0.25;
    }
    return value ? clampPercentage((value - minValue) / (maxValue - minValue), 1) : 0;
  }, [selfMounted, value, minValue, maxValue, isIndeterminate]);
  const offset = circumference - percentage * circumference;
  const getProgressBarProps = useCallback(
    (props2 = {}) => ({
      ref: domRef,
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(originalProps.isDisabled),
      className: slots.base({ class: baseStyles }),
      ...mergeProps(progressBarProps, otherProps, props2)
    }),
    [
      domRef,
      slots,
      isIndeterminate,
      originalProps.isDisabled,
      baseStyles,
      progressBarProps,
      otherProps
    ]
  );
  const getLabelProps = useCallback(
    (props2 = {}) => ({
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...mergeProps(labelProps, props2)
    }),
    [slots, classNames, labelProps]
  );
  const getSvgProps = useCallback(
    (props2 = {}) => ({
      viewBox: "0 0 32 32",
      fill: "none",
      strokeWidth,
      className: slots.svg({ class: classNames == null ? void 0 : classNames.svg }),
      ...props2
    }),
    [strokeWidth, slots, classNames]
  );
  const getIndicatorProps = useCallback(
    (props2 = {}) => ({
      cx: center,
      cy: center,
      r: radius,
      role: "presentation",
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: offset,
      transform: "rotate(-90 16 16)",
      strokeLinecap: "round",
      className: slots.indicator({ class: classNames == null ? void 0 : classNames.indicator }),
      ...props2
    }),
    [slots, classNames, offset, circumference, radius]
  );
  const getTrackProps = useCallback(
    (props2 = {}) => ({
      cx: center,
      cy: center,
      r: radius,
      role: "presentation",
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: 0,
      transform: "rotate(-90 16 16)",
      strokeLinecap: "round",
      className: slots.track({ class: classNames == null ? void 0 : classNames.track }),
      ...props2
    }),
    [slots, classNames, circumference, radius]
  );
  return {
    Component,
    domRef,
    slots,
    classNames,
    label,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
    getSvgProps,
    getIndicatorProps,
    getTrackProps
  };
}

export {
  useCircularProgress
};
