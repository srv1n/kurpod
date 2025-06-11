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

// src/use-chip.ts
var use_chip_exports = {};
__export(use_chip_exports, {
  useChip: () => useChip
});
module.exports = __toCommonJS(use_chip_exports);
var import_system = require("@nextui-org/system");
var import_utils = require("@react-aria/utils");
var import_interactions = require("@react-aria/interactions");
var import_focus = require("@react-aria/focus");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
function useChip(originalProps) {
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.chip.variantKeys);
  const {
    ref,
    as,
    children,
    avatar,
    startContent,
    endContent,
    onClose,
    classNames,
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const isCloseable = !!onClose;
  const isDotVariant = originalProps.variant === "dot";
  const { focusProps: closeFocusProps, isFocusVisible: isCloseButtonFocusVisible } = (0, import_focus.useFocusRing)();
  const isOneChar = (0, import_react.useMemo)(
    () => typeof children === "string" && (children == null ? void 0 : children.length) === 1,
    [children]
  );
  const hasStartContent = (0, import_react.useMemo)(() => !!avatar || !!startContent, [avatar, startContent]);
  const hasEndContent = (0, import_react.useMemo)(() => !!endContent || isCloseable, [endContent, isCloseable]);
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.chip)({
      ...variantProps,
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable,
      isCloseButtonFocusVisible
    }),
    [
      (0, import_shared_utils.objectToDeps)(variantProps),
      isCloseButtonFocusVisible,
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable
    ]
  );
  const { pressProps: closePressProps } = (0, import_interactions.usePress)({
    isDisabled: !!(originalProps == null ? void 0 : originalProps.isDisabled),
    onPress: onClose
  });
  const getChipProps = () => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...otherProps
    };
  };
  const getCloseButtonProps = () => {
    return {
      role: "button",
      tabIndex: 0,
      className: slots.closeButton({ class: classNames == null ? void 0 : classNames.closeButton }),
      "aria-label": "close chip",
      ...(0, import_utils.mergeProps)(closePressProps, closeFocusProps)
    };
  };
  const getAvatarClone = (avatar2) => {
    if (!(0, import_react.isValidElement)(avatar2))
      return null;
    return (0, import_react.cloneElement)(avatar2, {
      className: slots.avatar({ class: classNames == null ? void 0 : classNames.avatar })
    });
  };
  const getContentClone = (content) => (0, import_react.isValidElement)(content) ? (0, import_react.cloneElement)(content, {
    className: (0, import_shared_utils.clsx)("max-h-[80%]", content.props.className)
  }) : null;
  return {
    Component,
    children,
    slots,
    classNames,
    isDot: isDotVariant,
    isCloseable,
    startContent: getAvatarClone(avatar) || getContentClone(startContent),
    endContent: getContentClone(endContent),
    getCloseButtonProps,
    getChipProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useChip
});
