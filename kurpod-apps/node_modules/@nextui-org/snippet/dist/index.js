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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Snippet: () => snippet_default,
  useSnippet: () => useSnippet
});
module.exports = __toCommonJS(src_exports);

// src/use-snippet.ts
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

// src/snippet.tsx
var import_react2 = require("react");
var import_system2 = require("@nextui-org/system");
var import_tooltip = require("@nextui-org/tooltip");
var import_shared_icons = require("@nextui-org/shared-icons");
var import_button = require("@nextui-org/button");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var import_jsx_runtime = require("react/jsx-runtime");
var Snippet = (0, import_system2.forwardRef)((props, ref) => {
  const {
    Component,
    domRef,
    preRef,
    children,
    slots,
    classNames,
    copied,
    copyIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_shared_icons.CopyLinearIcon, {}),
    checkIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_shared_icons.CheckLinearIcon, {}),
    symbolBefore,
    disableCopy,
    disableTooltip,
    hideSymbol,
    hideCopyButton,
    tooltipProps,
    isMultiLine,
    onCopy,
    getSnippetProps,
    getCopyButtonProps
  } = useSnippet({ ...props, ref });
  const TooltipContent = (0, import_react2.useCallback)(
    ({ children: children2 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tooltip.Tooltip, { ...tooltipProps, isDisabled: copied || tooltipProps.isDisabled, children: children2 }),
    [(0, import_shared_utils2.objectToDeps)(tooltipProps)]
  );
  const contents = (0, import_react2.useMemo)(() => {
    if (hideCopyButton) {
      return null;
    }
    const clonedCheckIcon = checkIcon && (0, import_react2.cloneElement)(checkIcon, { className: slots.checkIcon() });
    const clonedCopyIcon = copyIcon && (0, import_react2.cloneElement)(copyIcon, { className: slots.copyIcon() });
    const copyButton = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_button.Button, { ...getCopyButtonProps(), children: [
      clonedCheckIcon,
      clonedCopyIcon
    ] });
    if (disableTooltip) {
      return copyButton;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: copyButton });
  }, [
    slots,
    classNames == null ? void 0 : classNames.copyButton,
    copied,
    checkIcon,
    copyIcon,
    onCopy,
    TooltipContent,
    disableCopy,
    disableTooltip,
    hideCopyButton
  ]);
  const preContent = (0, import_react2.useMemo)(() => {
    if (isMultiLine && children && Array.isArray(children)) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: slots.content({ class: classNames == null ? void 0 : classNames.content }), children: children.map((t, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", { className: slots.pre({ class: classNames == null ? void 0 : classNames.pre }), children: [
        !hideSymbol && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: slots.symbol({ class: classNames == null ? void 0 : classNames.symbol }), children: symbolBefore }),
        t
      ] }, `${index}-${t}`)) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", { ref: preRef, className: slots.pre({ class: classNames == null ? void 0 : classNames.pre }), children: [
      !hideSymbol && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: slots.symbol({ class: classNames == null ? void 0 : classNames.symbol }), children: symbolBefore }),
      children
    ] });
  }, [children, hideSymbol, isMultiLine, symbolBefore, classNames == null ? void 0 : classNames.pre, slots]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ref: domRef, ...getSnippetProps(), children: [
    preContent,
    contents
  ] });
});
Snippet.displayName = "NextUI.Snippet";
var snippet_default = Snippet;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Snippet,
  useSnippet
});
