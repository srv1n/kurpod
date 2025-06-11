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

// src/button-group.tsx
var button_group_exports = {};
__export(button_group_exports, {
  default: () => button_group_default
});
module.exports = __toCommonJS(button_group_exports);
var import_system2 = require("@nextui-org/system");

// src/button-group-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [ButtonGroupProvider, useButtonGroupContext] = (0, import_react_utils.createContext)({
  name: "ButtonGroupContext",
  strict: false
});

// src/use-button-group.ts
var import_theme = require("@nextui-org/theme");
var import_system = require("@nextui-org/system");
var import_react_utils2 = require("@nextui-org/react-utils");
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
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
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

// src/button-group.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ButtonGroup = (0, import_system2.forwardRef)((props, ref) => {
  const { Component, domRef, context, children, classNames, getButtonGroupProps } = useButtonGroup({
    ...props,
    ref
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonGroupProvider, { value: context, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ref: domRef, className: classNames, ...getButtonGroupProps(), children }) });
});
ButtonGroup.displayName = "NextUI.ButtonGroup";
var button_group_default = ButtonGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
