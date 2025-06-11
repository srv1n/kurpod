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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useAriaButton: () => useAriaButton
});
module.exports = __toCommonJS(src_exports);
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_interactions = require("@react-aria/interactions");
function useAriaButton(props, ref) {
  let {
    elementType = "button",
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    preventFocusOnPress,
    allowFocusWhenDisabled,
    onClick: deprecatedOnClick,
    href,
    target,
    rel,
    type = "button",
    allowTextSelectionOnPress
  } = props;
  let additionalProps;
  if (elementType === "button") {
    additionalProps = {
      type,
      disabled: isDisabled
    };
  } else {
    additionalProps = {
      role: "button",
      tabIndex: isDisabled ? void 0 : 0,
      href: elementType === "a" && !isDisabled ? href : void 0,
      target: elementType === "a" ? target : void 0,
      type: elementType === "input" ? type : void 0,
      disabled: elementType === "input" ? isDisabled : void 0,
      "aria-disabled": !isDisabled || elementType === "input" ? void 0 : isDisabled,
      rel: elementType === "a" ? rel : void 0
    };
  }
  let isMobile = (0, import_utils.isIOS)() || (0, import_utils.isAndroid)();
  if (deprecatedOnClick && typeof deprecatedOnClick === "function") {
    (0, import_shared_utils.warn)(
      "onClick is deprecated, please use onPress instead. See: https://github.com/nextui-org/nextui/issues/4292",
      "useButton"
    );
  }
  const handlePress = (e) => {
    if (isMobile) {
      deprecatedOnClick == null ? void 0 : deprecatedOnClick(e);
    }
    onPress == null ? void 0 : onPress(e);
  };
  let { pressProps, isPressed } = (0, import_interactions.usePress)({
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress: handlePress,
    isDisabled,
    preventFocusOnPress,
    allowTextSelectionOnPress,
    ref
  });
  let { focusableProps } = (0, import_focus.useFocusable)(props, ref);
  if (allowFocusWhenDisabled) {
    focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  }
  let buttonProps = (0, import_utils.mergeProps)(
    focusableProps,
    pressProps,
    (0, import_utils.filterDOMProps)(props, { labelable: true })
  );
  return {
    isPressed,
    buttonProps: (0, import_utils.mergeProps)(additionalProps, buttonProps, {
      "aria-haspopup": props["aria-haspopup"],
      "aria-expanded": props["aria-expanded"],
      "aria-controls": props["aria-controls"],
      "aria-pressed": props["aria-pressed"],
      onClick: (e) => {
        if (type === "button" && isMobile) {
          return;
        }
        deprecatedOnClick == null ? void 0 : deprecatedOnClick(e);
      }
    })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAriaButton
});
