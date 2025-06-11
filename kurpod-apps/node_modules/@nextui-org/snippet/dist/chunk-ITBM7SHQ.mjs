"use client";

// src/use-snippet.ts
import { snippet } from "@nextui-org/theme";
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { useClipboard } from "@nextui-org/use-clipboard";
import { useFocusRing } from "@react-aria/focus";
import { useMemo, useCallback, useRef } from "react";
function useSnippet(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, snippet.variantKeys);
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
    color: (_d = originalProps == null ? void 0 : originalProps.color) != null ? _d : (_c = snippet.defaultVariants) == null ? void 0 : _c.color,
    isDisabled: props.disableCopy,
    ...userTooltipProps
  };
  const domRef = useDOMRef(ref);
  const preRef = useRef(null);
  const { copy, copied } = useClipboard({ timeout });
  const isMultiLine = children && Array.isArray(children);
  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus
  });
  const slots = useMemo(
    () => snippet({
      ...variantProps,
      disableAnimation
    }),
    [objectToDeps(variantProps), disableAnimation]
  );
  const symbolBefore = useMemo(() => {
    if (!symbol || typeof symbol !== "string")
      return symbol;
    const str = symbol.trim();
    return str ? `${str} ` : "";
  }, [symbol]);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getSnippetProps = useCallback(
    () => ({
      className: slots.base({
        class: baseStyles
      }),
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps
      })
    }),
    [slots, baseStyles, isMultiLine, otherProps]
  );
  const onCopy = useCallback(() => {
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
  const getCopyButtonProps = useCallback(
    () => ({
      ...copyButtonProps,
      "data-copied": dataAttr(copied),
      className: slots.copyButton({
        class: clsx(classNames == null ? void 0 : classNames.copyButton)
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

export {
  useSnippet
};
