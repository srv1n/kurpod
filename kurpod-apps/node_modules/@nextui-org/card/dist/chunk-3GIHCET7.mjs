"use client";

// src/use-card.ts
import { card } from "@nextui-org/theme";
import { useCallback, useMemo } from "react";
import { chain, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useAriaButton } from "@nextui-org/use-aria-button";
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { filterDOMProps } from "@nextui-org/react-utils";
import { useDOMRef } from "@nextui-org/react-utils";
import { useRipple } from "@nextui-org/ripple";
function useCard(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, card.variantKeys);
  const {
    ref,
    as,
    children,
    onClick,
    onPress,
    autoFocus,
    className,
    classNames,
    allowTextSelectionOnPress = true,
    ...otherProps
  } = props;
  const domRef = useDOMRef(ref);
  const Component = as || (originalProps.isPressable ? "button" : "div");
  const shouldFilterDOMProps = typeof Component === "string";
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const disableRipple = (_d = (_c = originalProps.disableRipple) != null ? _c : globalContext == null ? void 0 : globalContext.disableRipple) != null ? _d : false;
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const { onClear: onClearRipple, onPress: onRipplePressHandler, ripples } = useRipple();
  const handlePress = useCallback(
    (e) => {
      if (disableRipple || disableAnimation)
        return;
      domRef.current && onRipplePressHandler(e);
    },
    [disableRipple, disableAnimation, domRef, onRipplePressHandler]
  );
  const { buttonProps, isPressed } = useAriaButton(
    {
      onPress: chain(onPress, handlePress),
      elementType: as,
      isDisabled: !originalProps.isPressable,
      onClick,
      allowTextSelectionOnPress,
      ...otherProps
    },
    domRef
  );
  const { hoverProps, isHovered } = useHover({
    isDisabled: !originalProps.isHoverable,
    ...otherProps
  });
  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus
  });
  const slots = useMemo(
    () => card({
      ...variantProps,
      disableAnimation
    }),
    [objectToDeps(variantProps), disableAnimation]
  );
  const context = useMemo(
    () => ({
      slots,
      classNames,
      disableAnimation,
      isDisabled: originalProps.isDisabled,
      isFooterBlurred: originalProps.isFooterBlurred,
      fullWidth: originalProps.fullWidth
    }),
    [
      slots,
      classNames,
      originalProps.isDisabled,
      originalProps.isFooterBlurred,
      disableAnimation,
      originalProps.fullWidth
    ]
  );
  const getCardProps = useCallback(
    (props2 = {}) => {
      return {
        ref: domRef,
        className: slots.base({ class: baseStyles }),
        tabIndex: originalProps.isPressable ? 0 : -1,
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(isPressed),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(originalProps.isDisabled),
        ...mergeProps(
          originalProps.isPressable ? { ...buttonProps, ...focusProps, role: "button" } : {},
          originalProps.isHoverable ? hoverProps : {},
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          filterDOMProps(props2)
        )
      };
    },
    [
      domRef,
      slots,
      baseStyles,
      shouldFilterDOMProps,
      originalProps.isPressable,
      originalProps.isHoverable,
      originalProps.isDisabled,
      isHovered,
      isPressed,
      isFocusVisible,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps
    ]
  );
  const getRippleProps = useCallback(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple]
  );
  return {
    context,
    domRef,
    Component,
    classNames,
    children,
    isHovered,
    isPressed,
    disableAnimation,
    isPressable: originalProps.isPressable,
    isHoverable: originalProps.isHoverable,
    disableRipple,
    handlePress,
    isFocusVisible,
    getCardProps,
    getRippleProps
  };
}

export {
  useCard
};
