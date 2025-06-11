"use client";

// src/use-pagination-item.ts
import { useMemo } from "react";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { chain, mergeProps, shouldClientNavigate, useRouter } from "@react-aria/utils";
import { filterDOMProps, useDOMRef } from "@nextui-org/react-utils";
import { useHover, usePress } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";
function usePaginationItem(props) {
  const {
    as,
    ref,
    value,
    children,
    isActive,
    isDisabled,
    onPress,
    onClick,
    getAriaLabel,
    className,
    ...otherProps
  } = props;
  const isLink = !!(props == null ? void 0 : props.href);
  const Component = as || isLink ? "a" : "li";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const router = useRouter();
  const ariaLabel = useMemo(
    () => isActive ? `${getAriaLabel == null ? void 0 : getAriaLabel(value)} active` : getAriaLabel == null ? void 0 : getAriaLabel(value),
    [value, isActive]
  );
  const { isPressed, pressProps } = usePress({
    isDisabled,
    onPress
  });
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({});
  const { isHovered, hoverProps } = useHover({ isDisabled });
  const getItemProps = (props2 = {}) => {
    return {
      ref: domRef,
      role: "button",
      tabIndex: isDisabled ? -1 : 0,
      "aria-label": ariaLabel,
      "aria-current": dataAttr(isActive),
      "aria-disabled": dataAttr(isDisabled),
      "data-disabled": dataAttr(isDisabled),
      "data-active": dataAttr(isActive),
      "data-focus": dataAttr(isFocused),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(
        props2,
        pressProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        })
      ),
      className: clsx(className, props2.className),
      onClick: (e) => {
        chain(pressProps == null ? void 0 : pressProps.onClick, onClick)(e);
        if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && !e.isDefaultPrevented() && shouldClientNavigate(e.currentTarget, e) && props2.href) {
          e.preventDefault();
          router.open(e.currentTarget, e, props2.href, props2.routerOptions);
        }
      }
    };
  };
  return {
    Component,
    children,
    ariaLabel,
    isFocused,
    isFocusVisible,
    getItemProps
  };
}

export {
  usePaginationItem
};
