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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CircularProgress: () => circular_progress_default,
  Progress: () => progress_default,
  useProgress: () => useProgress
});
module.exports = __toCommonJS(src_exports);

// src/progress.tsx
var import_system2 = require("@nextui-org/system");

// src/use-progress.ts
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

// src/progress.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Progress = (0, import_system2.forwardRef)((props, ref) => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...progressBarProps, children: [
    shouldShowLabelWrapper ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: slots.labelWrapper({ class: classNames == null ? void 0 : classNames.labelWrapper }), children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getLabelProps(), children: label }),
      showValueLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: slots.value({ class: classNames == null ? void 0 : classNames.value }), children: progressBarProps["aria-valuetext"] })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: slots.track({ class: classNames == null ? void 0 : classNames.track }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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

// src/circular-progress.tsx
var import_system4 = require("@nextui-org/system");

// src/use-circular-progress.ts
var import_system3 = require("@nextui-org/system");
var import_theme2 = require("@nextui-org/theme");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var import_utils2 = require("@react-aria/utils");
var import_react2 = require("react");
var import_use_is_mounted2 = require("@nextui-org/use-is-mounted");
var import_progress2 = require("@react-aria/progress");
function useCircularProgress(originalProps) {
  var _a, _b, _c;
  const globalContext = (0, import_system3.useProviderContext)();
  const [props, variantProps] = (0, import_system3.mapPropsVariants)(originalProps, import_theme2.circularProgress.variantKeys);
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
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const baseStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.base, className);
  const [, isMounted] = (0, import_use_is_mounted2.useIsMounted)({
    rerender: true,
    delay: 100
  });
  const isIndeterminate = ((_a = originalProps.isIndeterminate) != null ? _a : true) && value === void 0;
  const disableAnimation = (_c = (_b = originalProps.disableAnimation) != null ? _b : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _c : false;
  const { progressBarProps, labelProps } = (0, import_progress2.useProgressBar)({
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
  const slots = (0, import_react2.useMemo)(
    () => (0, import_theme2.circularProgress)({
      ...variantProps,
      disableAnimation,
      isIndeterminate
    }),
    [(0, import_shared_utils2.objectToDeps)(variantProps), disableAnimation, isIndeterminate]
  );
  const selfMounted = disableAnimation ? true : isMounted;
  const center = 16;
  const strokeWidth = strokeWidthProp || (originalProps.size === "sm" ? 2 : 3);
  const radius = 16 - strokeWidth;
  const circumference = 2 * radius * Math.PI;
  const percentage = (0, import_react2.useMemo)(() => {
    if (!selfMounted) {
      return 0;
    }
    if (isIndeterminate) {
      return 0.25;
    }
    return value ? (0, import_shared_utils2.clampPercentage)((value - minValue) / (maxValue - minValue), 1) : 0;
  }, [selfMounted, value, minValue, maxValue, isIndeterminate]);
  const offset = circumference - percentage * circumference;
  const getProgressBarProps = (0, import_react2.useCallback)(
    (props2 = {}) => ({
      ref: domRef,
      "data-indeterminate": (0, import_shared_utils2.dataAttr)(isIndeterminate),
      "data-disabled": (0, import_shared_utils2.dataAttr)(originalProps.isDisabled),
      className: slots.base({ class: baseStyles }),
      ...(0, import_utils2.mergeProps)(progressBarProps, otherProps, props2)
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
  const getLabelProps = (0, import_react2.useCallback)(
    (props2 = {}) => ({
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...(0, import_utils2.mergeProps)(labelProps, props2)
    }),
    [slots, classNames, labelProps]
  );
  const getSvgProps = (0, import_react2.useCallback)(
    (props2 = {}) => ({
      viewBox: "0 0 32 32",
      fill: "none",
      strokeWidth,
      className: slots.svg({ class: classNames == null ? void 0 : classNames.svg }),
      ...props2
    }),
    [strokeWidth, slots, classNames]
  );
  const getIndicatorProps = (0, import_react2.useCallback)(
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
  const getTrackProps = (0, import_react2.useCallback)(
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

// src/circular-progress.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var CircularProgress = (0, import_system4.forwardRef)((props, ref) => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Component, { ...progressBarProps, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: slots.svgWrapper({ class: classNames == null ? void 0 : classNames.svgWrapper }), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { ...getSvgProps(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { ...getTrackProps() }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { ...getIndicatorProps() })
      ] }),
      showValueLabel && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: slots.value({ class: classNames == null ? void 0 : classNames.value }), children: progressBarProps["aria-valuetext"] })
    ] }),
    label && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getLabelProps(), children: label })
  ] });
});
CircularProgress.displayName = "NextUI.CircularProgress";
var circular_progress_default = CircularProgress;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CircularProgress,
  Progress,
  useProgress
});
