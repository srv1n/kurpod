"use client";
import {
  useButtonGroupContext
} from "./chunk-BOMWXXSL.mjs";

// src/use-button.ts
import { useProviderContext } from "@nextui-org/system";
import { dataAttr } from "@nextui-org/shared-utils";
import { useCallback } from "react";
import { useFocusRing } from "@react-aria/focus";
import { chain, mergeProps } from "@react-aria/utils";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { button } from "@nextui-org/theme";
import { isValidElement, cloneElement, useMemo } from "react";
import { useAriaButton } from "@nextui-org/use-aria-button";
import { useHover } from "@react-aria/interactions";
import { useRipple } from "@nextui-org/ripple";
function useButton(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const groupContext = useButtonGroupContext();
  const globalContext = useProviderContext();
  const isInGroup = !!groupContext;
  const {
    ref,
    as,
    children,
    startContent: startContentProp,
    endContent: endContentProp,
    autoFocus,
    className,
    spinner,
    isLoading = false,
    disableRipple: disableRippleProp = false,
    fullWidth = (_a = groupContext == null ? void 0 : groupContext.fullWidth) != null ? _a : false,
    radius = groupContext == null ? void 0 : groupContext.radius,
    size = (_b = groupContext == null ? void 0 : groupContext.size) != null ? _b : "md",
    color = (_c = groupContext == null ? void 0 : groupContext.color) != null ? _c : "default",
    variant = (_d = groupContext == null ? void 0 : groupContext.variant) != null ? _d : "solid",
    disableAnimation = (_f = (_e = groupContext == null ? void 0 : groupContext.disableAnimation) != null ? _e : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _f : false,
    isDisabled: isDisabledProp = (_g = groupContext == null ? void 0 : groupContext.isDisabled) != null ? _g : false,
    isIconOnly = (_h = groupContext == null ? void 0 : groupContext.isIconOnly) != null ? _h : false,
    spinnerPlacement = "start",
    onPress,
    onClick,
    ...otherProps
  } = props;
  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const disableRipple = (_i = disableRippleProp || (globalContext == null ? void 0 : globalContext.disableRipple)) != null ? _i : disableAnimation;
  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus
  });
  const isDisabled = isDisabledProp || isLoading;
  const styles = useMemo(
    () => button({
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      disableAnimation,
      isIconOnly,
      className
    }),
    [
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      isIconOnly,
      disableAnimation,
      className
    ]
  );
  const { onPress: onRipplePressHandler, onClear: onClearRipple, ripples } = useRipple();
  const handlePress = useCallback(
    (e) => {
      if (disableRipple || isDisabled || disableAnimation)
        return;
      domRef.current && onRipplePressHandler(e);
    },
    [disableRipple, isDisabled, disableAnimation, domRef, onRipplePressHandler]
  );
  const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
    {
      elementType: as,
      isDisabled,
      onPress: chain(onPress, handlePress),
      onClick,
      ...otherProps
    },
    domRef
  );
  const { isHovered, hoverProps } = useHover({ isDisabled });
  const getButtonProps = useCallback(
    (props2 = {}) => ({
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-loading": dataAttr(isLoading),
      ...mergeProps(
        ariaButtonProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        filterDOMProps(props2)
      )
    }),
    [
      isLoading,
      isDisabled,
      isFocused,
      isPressed,
      shouldFilterDOMProps,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps
    ]
  );
  const getIconClone = (icon) => isValidElement(icon) ? cloneElement(icon, {
    "aria-hidden": true,
    focusable: false,
    tabIndex: -1
  }) : null;
  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);
  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap = {
      sm: "sm",
      md: "sm",
      lg: "md"
    };
    return buttonSpinnerSizeMap[size];
  }, [size]);
  const getRippleProps = useCallback(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple]
  );
  return {
    Component,
    children,
    domRef,
    spinner,
    styles,
    startContent,
    endContent,
    isLoading,
    spinnerPlacement,
    spinnerSize,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly
  };
}

export {
  useButton
};
