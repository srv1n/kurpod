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

// src/use-progress.ts
var use_progress_exports = {};
__export(use_progress_exports, {
  useProgress: () => useProgress
});
module.exports = __toCommonJS(use_progress_exports);
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
var import_react = require("react");
var import_use_is_mounted = require("@nextui-org/use-is-mounted");
var import_progress = require("@react-aria/progress");
function useProgress(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.progress.variantKeys);
  const {
    ref,
    as,
    id,
    className,
    classNames,
    label,
    valueLabel,
    value = 0,
    minValue = 0,
    maxValue = 100,
    showValueLabel = false,
    formatOptions = {
      style: "percent"
    },
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const [, isMounted] = (0, import_use_is_mounted.useIsMounted)({
    rerender: true,
    delay: 100
  });
  const isIndeterminate = originalProps.isIndeterminate;
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const { progressBarProps, labelProps } = (0, import_progress.useProgressBar)({
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
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.progress)({
      ...variantProps,
      disableAnimation
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation]
  );
  const selfMounted = disableAnimation ? true : isMounted;
  const percentage = (0, import_react.useMemo)(
    () => isIndeterminate || !selfMounted ? void 0 : (0, import_shared_utils.clampPercentage)((value - minValue) / (maxValue - minValue) * 100),
    [selfMounted, isIndeterminate, value, minValue, maxValue]
  );
  const getProgressBarProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      ref: domRef,
      "data-indeterminate": (0, import_shared_utils.dataAttr)(isIndeterminate),
      "data-disabled": (0, import_shared_utils.dataAttr)(originalProps.isDisabled),
      className: slots.base({ class: baseStyles }),
      ...(0, import_utils.mergeProps)(progressBarProps, otherProps, props2)
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
  const getLabelProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...(0, import_utils.mergeProps)(labelProps, props2)
    }),
    [slots, classNames, labelProps]
  );
  return {
    Component,
    domRef,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useProgress
});
