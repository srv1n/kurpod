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

// src/spinner.tsx
var spinner_exports = {};
__export(spinner_exports, {
  default: () => spinner_default
});
module.exports = __toCommonJS(spinner_exports);
var import_system_rsc2 = require("@nextui-org/system-rsc");

// src/use-spinner.ts
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

// src/spinner.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Spinner = (0, import_system_rsc2.forwardRef)((props, ref) => {
  const { slots, classNames, label, getSpinnerProps } = useSpinner({ ...props });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref, ...getSpinnerProps(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: slots.circle1({ class: classNames == null ? void 0 : classNames.circle1 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: slots.circle2({ class: classNames == null ? void 0 : classNames.circle2 }) })
    ] }),
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: slots.label({ class: classNames == null ? void 0 : classNames.label }), children: label })
  ] });
});
Spinner.displayName = "NextUI.Spinner";
var spinner_default = Spinner;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
