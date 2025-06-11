"use client";
import {
  useSnippet
} from "./chunk-ITBM7SHQ.mjs";

// src/snippet.tsx
import { useCallback, useMemo, cloneElement } from "react";
import { forwardRef } from "@nextui-org/system";
import { Tooltip } from "@nextui-org/tooltip";
import { CopyLinearIcon, CheckLinearIcon } from "@nextui-org/shared-icons";
import { Button } from "@nextui-org/button";
import { objectToDeps } from "@nextui-org/shared-utils";
import { jsx, jsxs } from "react/jsx-runtime";
var Snippet = forwardRef((props, ref) => {
  const {
    Component,
    domRef,
    preRef,
    children,
    slots,
    classNames,
    copied,
    copyIcon = /* @__PURE__ */ jsx(CopyLinearIcon, {}),
    checkIcon = /* @__PURE__ */ jsx(CheckLinearIcon, {}),
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
  const TooltipContent = useCallback(
    ({ children: children2 }) => /* @__PURE__ */ jsx(Tooltip, { ...tooltipProps, isDisabled: copied || tooltipProps.isDisabled, children: children2 }),
    [objectToDeps(tooltipProps)]
  );
  const contents = useMemo(() => {
    if (hideCopyButton) {
      return null;
    }
    const clonedCheckIcon = checkIcon && cloneElement(checkIcon, { className: slots.checkIcon() });
    const clonedCopyIcon = copyIcon && cloneElement(copyIcon, { className: slots.copyIcon() });
    const copyButton = /* @__PURE__ */ jsxs(Button, { ...getCopyButtonProps(), children: [
      clonedCheckIcon,
      clonedCopyIcon
    ] });
    if (disableTooltip) {
      return copyButton;
    }
    return /* @__PURE__ */ jsx(TooltipContent, { children: copyButton });
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
  const preContent = useMemo(() => {
    if (isMultiLine && children && Array.isArray(children)) {
      return /* @__PURE__ */ jsx("div", { className: slots.content({ class: classNames == null ? void 0 : classNames.content }), children: children.map((t, index) => /* @__PURE__ */ jsxs("pre", { className: slots.pre({ class: classNames == null ? void 0 : classNames.pre }), children: [
        !hideSymbol && /* @__PURE__ */ jsx("span", { className: slots.symbol({ class: classNames == null ? void 0 : classNames.symbol }), children: symbolBefore }),
        t
      ] }, `${index}-${t}`)) });
    }
    return /* @__PURE__ */ jsxs("pre", { ref: preRef, className: slots.pre({ class: classNames == null ? void 0 : classNames.pre }), children: [
      !hideSymbol && /* @__PURE__ */ jsx("span", { className: slots.symbol({ class: classNames == null ? void 0 : classNames.symbol }), children: symbolBefore }),
      children
    ] });
  }, [children, hideSymbol, isMultiLine, symbolBefore, classNames == null ? void 0 : classNames.pre, slots]);
  return /* @__PURE__ */ jsxs(Component, { ref: domRef, ...getSnippetProps(), children: [
    preContent,
    contents
  ] });
});
Snippet.displayName = "NextUI.Snippet";
var snippet_default = Snippet;

export {
  snippet_default
};
