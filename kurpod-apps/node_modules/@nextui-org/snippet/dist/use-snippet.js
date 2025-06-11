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

// src/use-snippet.ts
var use_snippet_exports = {};
__export(use_snippet_exports, {
  useSnippet: () => useSnippet
});
module.exports = __toCommonJS(use_snippet_exports);
var import_theme = require("@nextui-org/theme");
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_use_clipboard = require("@nextui-org/use-clipboard");
var import_focus = require("@react-aria/focus");
var import_react = require("react");
function useSnippet(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.snippet.variantKeys);
  const {
    ref,
    as,
    children,
    symbol = "$",
    classNames,
    timeout,
    copyIcon,
    checkIcon,
    codeString,
    disableCopy = false,
    disableTooltip = false,
    hideCopyButton = false,
    autoFocus = false,
    hideSymbol = false,
    onCopy: onCopyProp,
    tooltipProps: userTooltipProps = {},
    copyButtonProps: userButtonProps = {},
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const tooltipProps = {
    offset: 15,
    delay: 1e3,
    content: "Copy to clipboard",
    color: (_d = originalProps == null ? void 0 : originalProps.color) != null ? _d : (_c = import_theme.snippet.defaultVariants) == null ? void 0 : _c.color,
    isDisabled: props.disableCopy,
    ...userTooltipProps
  };
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const preRef = (0, import_react.useRef)(null);
  const { copy, copied } = (0, import_use_clipboard.useClipboard)({ timeout });
  const isMultiLine = children && Array.isArray(children);
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.snippet)({
      ...variantProps,
      disableAnimation
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation]
  );
  const symbolBefore = (0, import_react.useMemo)(() => {
    if (!symbol || typeof symbol !== "string")
      return symbol;
    const str = symbol.trim();
    return str ? `${str} ` : "";
  }, [symbol]);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getSnippetProps = (0, import_react.useCallback)(
    () => ({
      className: slots.base({
        class: baseStyles
      }),
      ...(0, import_react_utils.filterDOMProps)(otherProps, {
        enabled: shouldFilterDOMProps
      })
    }),
    [slots, baseStyles, isMultiLine, otherProps]
  );
  const onCopy = (0, import_react.useCallback)(() => {
    var _a2;
    if (disableCopy) {
      return;
    }
    let stringValue = "";
    if (typeof children === "string") {
      stringValue = children;
    } else if (Array.isArray(children)) {
      children.forEach((child) => {
        var _a3, _b2;
        const childString = typeof child === "string" ? child : (_b2 = (_a3 = child == null ? void 0 : child.props) == null ? void 0 : _a3.children) == null ? void 0 : _b2.toString();
        if (childString) {
          stringValue += childString + "\n";
        }
      });
    }
    const valueToCopy = codeString || stringValue || ((_a2 = preRef.current) == null ? void 0 : _a2.textContent) || "";
    copy(valueToCopy);
    onCopyProp == null ? void 0 : onCopyProp(valueToCopy);
  }, [copy, codeString, disableCopy, onCopyProp, children]);
  const copyButtonProps = {
    "aria-label": typeof tooltipProps.content === "string" ? tooltipProps.content : "Copy to clipboard",
    size: "sm",
    variant: "light",
    isDisabled: disableCopy,
    onPress: onCopy,
    isIconOnly: true,
    ...userButtonProps
  };
  const getCopyButtonProps = (0, import_react.useCallback)(
    () => ({
      ...copyButtonProps,
      "data-copied": (0, import_shared_utils.dataAttr)(copied),
      className: slots.copyButton({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.copyButton)
      })
    }),
    [
      slots,
      isFocusVisible,
      isFocused,
      disableCopy,
      classNames == null ? void 0 : classNames.copyButton,
      copyButtonProps,
      focusProps
    ]
  );
  return {
    Component,
    as,
    domRef,
    preRef,
    children,
    slots,
    classNames,
    copied,
    onCopy,
    copyIcon,
    checkIcon,
    symbolBefore,
    isMultiLine,
    isFocusVisible,
    hideCopyButton,
    disableCopy,
    disableTooltip,
    hideSymbol,
    tooltipProps,
    getSnippetProps,
    getCopyButtonProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSnippet
});
