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

// src/use-link.ts
var use_link_exports = {};
__export(use_link_exports, {
  useLink: () => useLink
});
module.exports = __toCommonJS(use_link_exports);
var import_theme = require("@nextui-org/theme");
var import_use_aria_link = require("@nextui-org/use-aria-link");
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_focus = require("@react-aria/focus");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
var import_utils = require("@react-aria/utils");
function useLink(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.link.variantKeys);
  const {
    ref,
    as,
    children,
    anchorIcon,
    isExternal = false,
    showAnchorIcon = false,
    autoFocus = false,
    className,
    onPress,
    onPressStart,
    onPressEnd,
    onClick,
    ...otherProps
  } = props;
  const Component = as || "a";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const { linkProps } = (0, import_use_aria_link.useAriaLink)(
    {
      ...otherProps,
      onPress,
      onPressStart,
      onPressEnd,
      onClick,
      isDisabled: originalProps.isDisabled,
      elementType: `${as}`
    },
    domRef
  );
  const { isFocused, isFocusVisible, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  if (isExternal) {
    otherProps.rel = (_c = otherProps.rel) != null ? _c : "noopener noreferrer";
    otherProps.target = (_d = otherProps.target) != null ? _d : "_blank";
  }
  const classNames = (0, import_react.useMemo)(
    () => (0, import_theme.link)({
      ...variantProps,
      disableAnimation,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation, className]
  );
  const getLinkProps = (0, import_react.useCallback)(() => {
    return {
      ref: domRef,
      className: classNames,
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-disabled": (0, import_shared_utils.dataAttr)(originalProps.isDisabled),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      ...(0, import_utils.mergeProps)(focusProps, linkProps, otherProps)
    };
  }, [classNames, isFocused, isFocusVisible, focusProps, linkProps, otherProps]);
  return { Component, children, anchorIcon, showAnchorIcon, getLinkProps };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useLink
});
