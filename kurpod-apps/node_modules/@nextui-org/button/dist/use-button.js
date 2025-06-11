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

// src/use-button.ts
var use_button_exports = {};
__export(use_button_exports, {
  useButton: () => useButton
});
module.exports = __toCommonJS(use_button_exports);
var import_system = require("@nextui-org/system");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
var import_focus = require("@react-aria/focus");
var import_utils = require("@react-aria/utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_theme = require("@nextui-org/theme");
var import_react2 = require("react");
var import_use_aria_button = require("@nextui-org/use-aria-button");
var import_interactions = require("@react-aria/interactions");
var import_ripple = require("@nextui-org/ripple");

// src/button-group-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [ButtonGroupProvider, useButtonGroupContext] = (0, import_react_utils.createContext)({
  name: "ButtonGroupContext",
  strict: false
});

// src/use-button.ts
function useButton(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const groupContext = useButtonGroupContext();
  const globalContext = (0, import_system.useProviderContext)();
  const isInGroup = !!groupContext;
  const {
    ref,
    as,
    children,
    startContent: startContentProp,
    endContent: endContentProp,
    autoFocus,
    className,
    spinner,
    isLoading = false,
    disableRipple: disableRippleProp = false,
    fullWidth = (_a = groupContext == null ? void 0 : groupContext.fullWidth) != null ? _a : false,
    radius = groupContext == null ? void 0 : groupContext.radius,
    size = (_b = groupContext == null ? void 0 : groupContext.size) != null ? _b : "md",
    color = (_c = groupContext == null ? void 0 : groupContext.color) != null ? _c : "default",
    variant = (_d = groupContext == null ? void 0 : groupContext.variant) != null ? _d : "solid",
    disableAnimation = (_f = (_e = groupContext == null ? void 0 : groupContext.disableAnimation) != null ? _e : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _f : false,
    isDisabled: isDisabledProp = (_g = groupContext == null ? void 0 : groupContext.isDisabled) != null ? _g : false,
    isIconOnly = (_h = groupContext == null ? void 0 : groupContext.isIconOnly) != null ? _h : false,
    spinnerPlacement = "start",
    onPress,
    onClick,
    ...otherProps
  } = props;
  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const disableRipple = (_i = disableRippleProp || (globalContext == null ? void 0 : globalContext.disableRipple)) != null ? _i : disableAnimation;
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const isDisabled = isDisabledProp || isLoading;
  const styles = (0, import_react2.useMemo)(
    () => (0, import_theme.button)({
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      disableAnimation,
      isIconOnly,
      className
    }),
    [
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      isIconOnly,
      disableAnimation,
      className
    ]
  );
  const { onPress: onRipplePressHandler, onClear: onClearRipple, ripples } = (0, import_ripple.useRipple)();
  const handlePress = (0, import_react.useCallback)(
    (e) => {
      if (disableRipple || isDisabled || disableAnimation)
        return;
      domRef.current && onRipplePressHandler(e);
    },
    [disableRipple, isDisabled, disableAnimation, domRef, onRipplePressHandler]
  );
  const { buttonProps: ariaButtonProps, isPressed } = (0, import_use_aria_button.useAriaButton)(
    {
      elementType: as,
      isDisabled,
      onPress: (0, import_utils.chain)(onPress, handlePress),
      onClick,
      ...otherProps
    },
    domRef
  );
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  const getButtonProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-loading": (0, import_shared_utils.dataAttr)(isLoading),
      ...(0, import_utils.mergeProps)(
        ariaButtonProps,
        focusProps,
        hoverProps,
        (0, import_react_utils2.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        (0, import_react_utils2.filterDOMProps)(props2)
      )
    }),
    [
      isLoading,
      isDisabled,
      isFocused,
      isPressed,
      shouldFilterDOMProps,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps
    ]
  );
  const getIconClone = (icon) => (0, import_react2.isValidElement)(icon) ? (0, import_react2.cloneElement)(icon, {
    "aria-hidden": true,
    focusable: false,
    tabIndex: -1
  }) : null;
  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);
  const spinnerSize = (0, import_react2.useMemo)(() => {
    const buttonSpinnerSizeMap = {
      sm: "sm",
      md: "sm",
      lg: "md"
    };
    return buttonSpinnerSizeMap[size];
  }, [size]);
  const getRippleProps = (0, import_react.useCallback)(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple]
  );
  return {
    Component,
    children,
    domRef,
    spinner,
    styles,
    startContent,
    endContent,
    isLoading,
    spinnerPlacement,
    spinnerSize,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useButton
});
