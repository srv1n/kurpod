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

// src/use-accordion-item.ts
var use_accordion_item_exports = {};
__export(use_accordion_item_exports, {
  useAccordionItem: () => useAccordionItem
});
module.exports = __toCommonJS(use_accordion_item_exports);
var import_system = require("@nextui-org/system");
var import_focus = require("@react-aria/focus");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils = require("@nextui-org/react-utils");
var import_use_aria_accordion = require("@nextui-org/use-aria-accordion");
var import_react = require("react");
var import_utils = require("@react-aria/utils");
var import_interactions = require("@react-aria/interactions");
function useAccordionItem(props) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const { ref, as, item, onFocusChange } = props;
  const {
    state,
    className,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    motionProps,
    focusedKey,
    variant,
    isCompact = false,
    classNames: classNamesProp = {},
    isDisabled: isDisabledProp = false,
    hideIndicator = false,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    keepContentMounted = false,
    disableIndicatorAnimation = false,
    HeadingComponent = as || "h2",
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onClick,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const isDisabled = state.disabledKeys.has(item.key) || isDisabledProp;
  const isOpen = state.selectionManager.isSelected(item.key);
  const { buttonProps: buttonCompleteProps, regionProps } = (0, import_use_aria_accordion.useReactAriaAccordionItem)(
    { item, isDisabled },
    { ...state, focusedKey },
    domRef
  );
  const { onFocus: onFocusButton, onBlur: onBlurButton, ...buttonProps } = buttonCompleteProps;
  const { isFocused, isFocusVisible, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus: (_b = item.props) == null ? void 0 : _b.autoFocus
  });
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  const { pressProps, isPressed } = (0, import_interactions.usePress)({
    ref: domRef,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp
  });
  const handleFocus = (0, import_react.useCallback)(() => {
    onFocusChange == null ? void 0 : onFocusChange(true, item.key);
  }, []);
  const handleBlur = (0, import_react.useCallback)(() => {
    onFocusChange == null ? void 0 : onFocusChange(false, item.key);
  }, []);
  const classNames = (0, import_react.useMemo)(
    () => ({
      ...classNamesProp
    }),
    [(0, import_shared_utils.objectToDeps)(classNamesProp)]
  );
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.accordionItem)({
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      disableIndicatorAnimation,
      variant
    }),
    [isCompact, isDisabled, hideIndicator, disableAnimation, disableIndicatorAnimation, variant]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.base({ class: baseStyles }),
        ...(0, import_utils.mergeProps)(
          (0, import_react_utils.filterDOMProps)(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          props2
        )
      };
    },
    [baseStyles, shouldFilterDOMProps, otherProps, slots, item.props, isOpen, isDisabled]
  );
  const getButtonProps = (props2 = {}) => {
    var _a2, _b2;
    return {
      ref: domRef,
      "data-open": (0, import_shared_utils.dataAttr)(isOpen),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
      className: slots.trigger({ class: classNames == null ? void 0 : classNames.trigger }),
      onFocus: (0, import_shared_utils.callAllHandlers)(
        handleFocus,
        onFocusButton,
        focusProps.onFocus,
        otherProps.onFocus,
        (_a2 = item.props) == null ? void 0 : _a2.onFocus
      ),
      onBlur: (0, import_shared_utils.callAllHandlers)(
        handleBlur,
        onBlurButton,
        focusProps.onBlur,
        otherProps.onBlur,
        (_b2 = item.props) == null ? void 0 : _b2.onBlur
      ),
      ...(0, import_utils.mergeProps)(buttonProps, hoverProps, pressProps, props2, {
        onClick: (0, import_utils.chain)(pressProps.onClick, onClick)
      })
    };
  };
  const getContentProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.content({ class: classNames == null ? void 0 : classNames.content }),
        ...(0, import_utils.mergeProps)(regionProps, props2)
      };
    },
    [slots, classNames, regionProps, isOpen, isDisabled, classNames == null ? void 0 : classNames.content]
  );
  const getIndicatorProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "aria-hidden": (0, import_shared_utils.dataAttr)(true),
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.indicator({ class: classNames == null ? void 0 : classNames.indicator }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.indicator, isOpen, isDisabled, classNames == null ? void 0 : classNames.indicator]
  );
  const getHeadingProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.heading({ class: classNames == null ? void 0 : classNames.heading }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.heading, isOpen, isDisabled, classNames == null ? void 0 : classNames.heading]
  );
  const getTitleProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.title({ class: classNames == null ? void 0 : classNames.title }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.title, isOpen, isDisabled, classNames == null ? void 0 : classNames.title]
  );
  const getSubtitleProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.subtitle({ class: classNames == null ? void 0 : classNames.subtitle }),
        ...props2
      };
    },
    [slots, classNames, isOpen, isDisabled, classNames == null ? void 0 : classNames.subtitle]
  );
  return {
    Component,
    HeadingComponent,
    item,
    slots,
    classNames,
    domRef,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getContentProps,
    getIndicatorProps,
    getTitleProps,
    getSubtitleProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAccordionItem
});
