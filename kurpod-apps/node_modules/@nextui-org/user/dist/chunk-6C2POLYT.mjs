"use client";

// src/use-user.ts
import { useMemo, useCallback } from "react";
import { useFocusRing } from "@react-aria/focus";
import { user } from "@nextui-org/theme";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { filterDOMProps } from "@nextui-org/react-utils";
import { useDOMRef } from "@nextui-org/react-utils";
import { mergeProps } from "@react-aria/utils";
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
  const domRef = useDOMRef(ref);
  const { isFocusVisible, isFocused, focusProps } = useFocusRing({});
  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);
  const slots = useMemo(() => user(), []);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getUserProps = useCallback(
    () => ({
      ref: domRef,
      tabIndex: canBeFocused ? 0 : -1,
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focus": dataAttr(isFocused),
      className: slots.base({
        class: baseStyles
      }),
      ...mergeProps(
        filterDOMProps(otherProps, {
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

export {
  useUser
};
