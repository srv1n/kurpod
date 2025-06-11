"use client";

// src/use-link.ts
import { link } from "@nextui-org/theme";
import { useAriaLink } from "@nextui-org/use-aria-link";
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { useFocusRing } from "@react-aria/focus";
import { dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { useMemo, useCallback } from "react";
import { mergeProps } from "@react-aria/utils";
function useLink(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, link.variantKeys);
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
  const domRef = useDOMRef(ref);
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const { linkProps } = useAriaLink(
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
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    autoFocus
  });
  if (isExternal) {
    otherProps.rel = (_c = otherProps.rel) != null ? _c : "noopener noreferrer";
    otherProps.target = (_d = otherProps.target) != null ? _d : "_blank";
  }
  const classNames = useMemo(
    () => link({
      ...variantProps,
      disableAnimation,
      className
    }),
    [objectToDeps(variantProps), disableAnimation, className]
  );
  const getLinkProps = useCallback(() => {
    return {
      ref: domRef,
      className: classNames,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(focusProps, linkProps, otherProps)
    };
  }, [classNames, isFocused, isFocusVisible, focusProps, linkProps, otherProps]);
  return { Component, children, anchorIcon, showAnchorIcon, getLinkProps };
}

export {
  useLink
};
