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

// src/use-spinner.ts
var use_spinner_exports = {};
__export(use_spinner_exports, {
  useSpinner: () => useSpinner
});
module.exports = __toCommonJS(use_spinner_exports);
var import_system_rsc = require("@nextui-org/system-rsc");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
function useSpinner(originalProps) {
  const [props, variantProps] = (0, import_system_rsc.mapPropsVariants)(originalProps, import_theme.spinner.variantKeys);
  const { children, className, classNames, label: labelProp, ...otherProps } = props;
  const slots = (0, import_react.useMemo)(() => (0, import_theme.spinner)({ ...variantProps }), [(0, import_shared_utils.objectToDeps)(variantProps)]);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const label = labelProp || children;
  const ariaLabel = (0, import_react.useMemo)(() => {
    if (label && typeof label === "string") {
      return label;
    }
    return !otherProps["aria-label"] ? "Loading" : "";
  }, [children, label, otherProps["aria-label"]]);
  const getSpinnerProps = (0, import_react.useCallback)(
    () => ({
      "aria-label": ariaLabel,
      className: slots.base({
        class: baseStyles
      }),
      ...otherProps
    }),
    [ariaLabel, slots, baseStyles, otherProps]
  );
  return { label, slots, classNames, getSpinnerProps };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSpinner
});
