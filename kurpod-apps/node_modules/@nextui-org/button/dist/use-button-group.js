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

// src/use-button-group.ts
var use_button_group_exports = {};
__export(use_button_group_exports, {
  useButtonGroup: () => useButtonGroup
});
module.exports = __toCommonJS(use_button_group_exports);
var import_theme = require("@nextui-org/theme");
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_react = require("react");
var import_shared_utils = require("@nextui-org/shared-utils");
function useButtonGroup(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.buttonGroup.variantKeys);
  const {
    ref,
    as,
    children,
    color = "default",
    size = "md",
    variant = "solid",
    radius,
    isDisabled = false,
    isIconOnly = false,
    disableRipple = (_a = globalContext == null ? void 0 : globalContext.disableRipple) != null ? _a : false,
    disableAnimation = (_b = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false,
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const classNames = (0, import_react.useMemo)(
    () => (0, import_theme.buttonGroup)({
      ...variantProps,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), className]
  );
  const context = (0, import_react.useMemo)(
    () => ({
      size,
      color,
      variant,
      radius,
      isIconOnly,
      isDisabled,
      disableAnimation,
      disableRipple,
      fullWidth: !!(originalProps == null ? void 0 : originalProps.fullWidth)
    }),
    [
      size,
      color,
      variant,
      radius,
      isDisabled,
      isIconOnly,
      disableAnimation,
      disableRipple,
      originalProps == null ? void 0 : originalProps.fullWidth
    ]
  );
  const getButtonGroupProps = (0, import_react.useCallback)(
    () => ({
      role: "group",
      ...otherProps
    }),
    [otherProps]
  );
  return {
    Component,
    children,
    domRef,
    context,
    classNames,
    getButtonGroupProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useButtonGroup
});
