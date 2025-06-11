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

// src/card.tsx
var card_exports = {};
__export(card_exports, {
  default: () => card_default
});
module.exports = __toCommonJS(card_exports);
var import_system2 = require("@nextui-org/system");
var import_ripple2 = require("@nextui-org/ripple");

// src/card-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [CardProvider, useCardContext] = (0, import_react_utils.createContext)({
  name: "CardContext",
  strict: true,
  errorMessage: "useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />"
});

// src/use-card.ts
var import_theme = require("@nextui-org/theme");
var import_react = require("react");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_interactions = require("@react-aria/interactions");
var import_use_aria_button = require("@nextui-org/use-aria-button");
var import_system = require("@nextui-org/system");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_react_utils3 = require("@nextui-org/react-utils");
var import_ripple = require("@nextui-org/ripple");
function useCard(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.card.variantKeys);
  const {
    ref,
    as,
    children,
    onClick,
    onPress,
    autoFocus,
    className,
    classNames,
    allowTextSelectionOnPress = true,
    ...otherProps
  } = props;
  const domRef = (0, import_react_utils3.useDOMRef)(ref);
  const Component = as || (originalProps.isPressable ? "button" : "div");
  const shouldFilterDOMProps = typeof Component === "string";
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const disableRipple = (_d = (_c = originalProps.disableRipple) != null ? _c : globalContext == null ? void 0 : globalContext.disableRipple) != null ? _d : false;
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const { onClear: onClearRipple, onPress: onRipplePressHandler, ripples } = (0, import_ripple.useRipple)();
  const handlePress = (0, import_react.useCallback)(
    (e) => {
      if (disableRipple || disableAnimation)
        return;
      domRef.current && onRipplePressHandler(e);
    },
    [disableRipple, disableAnimation, domRef, onRipplePressHandler]
  );
  const { buttonProps, isPressed } = (0, import_use_aria_button.useAriaButton)(
    {
      onPress: (0, import_utils.chain)(onPress, handlePress),
      elementType: as,
      isDisabled: !originalProps.isPressable,
      onClick,
      allowTextSelectionOnPress,
      ...otherProps
    },
    domRef
  );
  const { hoverProps, isHovered } = (0, import_interactions.useHover)({
    isDisabled: !originalProps.isHoverable,
    ...otherProps
  });
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.card)({
      ...variantProps,
      disableAnimation
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation]
  );
  const context = (0, import_react.useMemo)(
    () => ({
      slots,
      classNames,
      disableAnimation,
      isDisabled: originalProps.isDisabled,
      isFooterBlurred: originalProps.isFooterBlurred,
      fullWidth: originalProps.fullWidth
    }),
    [
      slots,
      classNames,
      originalProps.isDisabled,
      originalProps.isFooterBlurred,
      disableAnimation,
      originalProps.fullWidth
    ]
  );
  const getCardProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ref: domRef,
        className: slots.base({ class: baseStyles }),
        tabIndex: originalProps.isPressable ? 0 : -1,
        "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
        "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
        "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
        "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
        "data-disabled": (0, import_shared_utils.dataAttr)(originalProps.isDisabled),
        ...(0, import_utils.mergeProps)(
          originalProps.isPressable ? { ...buttonProps, ...focusProps, role: "button" } : {},
          originalProps.isHoverable ? hoverProps : {},
          (0, import_react_utils2.filterDOMProps)(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          (0, import_react_utils2.filterDOMProps)(props2)
        )
      };
    },
    [
      domRef,
      slots,
      baseStyles,
      shouldFilterDOMProps,
      originalProps.isPressable,
      originalProps.isHoverable,
      originalProps.isDisabled,
      isHovered,
      isPressed,
      isFocusVisible,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps
    ]
  );
  const getRippleProps = (0, import_react.useCallback)(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple]
  );
  return {
    context,
    domRef,
    Component,
    classNames,
    children,
    isHovered,
    isPressed,
    disableAnimation,
    isPressable: originalProps.isPressable,
    isHoverable: originalProps.isHoverable,
    disableRipple,
    handlePress,
    isFocusVisible,
    getCardProps,
    getRippleProps
  };
}

// src/card.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Card = (0, import_system2.forwardRef)((props, ref) => {
  const {
    children,
    context,
    Component,
    isPressable,
    disableAnimation,
    disableRipple,
    getCardProps,
    getRippleProps
  } = useCard({ ...props, ref });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...getCardProps(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardProvider, { value: context, children }),
    isPressable && !disableAnimation && !disableRipple && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ripple2.Ripple, { ...getRippleProps() })
  ] });
});
Card.displayName = "NextUI.Card";
var card_default = Card;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
