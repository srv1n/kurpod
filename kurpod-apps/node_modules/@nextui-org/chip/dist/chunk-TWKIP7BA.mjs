"use client";

// src/use-chip.ts
import { mapPropsVariants } from "@nextui-org/system";
import { mergeProps } from "@react-aria/utils";
import { usePress } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";
import { chip } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, objectToDeps } from "@nextui-org/shared-utils";
import { useMemo, isValidElement, cloneElement } from "react";
function useChip(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, chip.variantKeys);
  const {
    ref,
    as,
    children,
    avatar,
    startContent,
    endContent,
    onClose,
    classNames,
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const isCloseable = !!onClose;
  const isDotVariant = originalProps.variant === "dot";
  const { focusProps: closeFocusProps, isFocusVisible: isCloseButtonFocusVisible } = useFocusRing();
  const isOneChar = useMemo(
    () => typeof children === "string" && (children == null ? void 0 : children.length) === 1,
    [children]
  );
  const hasStartContent = useMemo(() => !!avatar || !!startContent, [avatar, startContent]);
  const hasEndContent = useMemo(() => !!endContent || isCloseable, [endContent, isCloseable]);
  const slots = useMemo(
    () => chip({
      ...variantProps,
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable,
      isCloseButtonFocusVisible
    }),
    [
      objectToDeps(variantProps),
      isCloseButtonFocusVisible,
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable
    ]
  );
  const { pressProps: closePressProps } = usePress({
    isDisabled: !!(originalProps == null ? void 0 : originalProps.isDisabled),
    onPress: onClose
  });
  const getChipProps = () => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...otherProps
    };
  };
  const getCloseButtonProps = () => {
    return {
      role: "button",
      tabIndex: 0,
      className: slots.closeButton({ class: classNames == null ? void 0 : classNames.closeButton }),
      "aria-label": "close chip",
      ...mergeProps(closePressProps, closeFocusProps)
    };
  };
  const getAvatarClone = (avatar2) => {
    if (!isValidElement(avatar2))
      return null;
    return cloneElement(avatar2, {
      className: slots.avatar({ class: classNames == null ? void 0 : classNames.avatar })
    });
  };
  const getContentClone = (content) => isValidElement(content) ? cloneElement(content, {
    className: clsx("max-h-[80%]", content.props.className)
  }) : null;
  return {
    Component,
    children,
    slots,
    classNames,
    isDot: isDotVariant,
    isCloseable,
    startContent: getAvatarClone(avatar) || getContentClone(startContent),
    endContent: getContentClone(endContent),
    getCloseButtonProps,
    getChipProps
  };
}

export {
  useChip
};
