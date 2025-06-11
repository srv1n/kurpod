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

// src/use-user.ts
var use_user_exports = {};
__export(use_user_exports, {
  useUser: () => useUser
});
module.exports = __toCommonJS(use_user_exports);
var import_react = require("react");
var import_focus = require("@react-aria/focus");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils = require("@nextui-org/react-utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_utils = require("@react-aria/utils");
function useUser(props) {
  const {
    as,
    ref,
    name,
    description,
    className,
    classNames,
    isFocusable = false,
    avatarProps: userAvatarProps = {},
    ...otherProps
  } = props;
  const avatarProps = {
    isFocusable: false,
    ...userAvatarProps
  };
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({});
  const canBeFocused = (0, import_react.useMemo)(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);
  const slots = (0, import_react.useMemo)(() => (0, import_theme.user)(), []);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getUserProps = (0, import_react.useCallback)(
    () => ({
      ref: domRef,
      tabIndex: canBeFocused ? 0 : -1,
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      className: slots.base({
        class: baseStyles
      }),
      ...(0, import_utils.mergeProps)(
        (0, import_react_utils.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        canBeFocused ? focusProps : {}
      )
    }),
    [canBeFocused, slots, baseStyles, focusProps, otherProps]
  );
  return {
    Component,
    className,
    slots,
    name,
    description,
    classNames,
    baseStyles,
    avatarProps,
    getUserProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useUser
});
