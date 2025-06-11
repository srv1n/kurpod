"use client";

// src/use-breadcrumb-item.ts
import { mapPropsVariants } from "@nextui-org/system";
import { useFocusRing } from "@react-aria/focus";
import { breadcrumbItem } from "@nextui-org/theme";
import { filterDOMProps, useDOMRef } from "@nextui-org/react-utils";
import { useBreadcrumbItem as useAriaBreadcrumbItem } from "@react-aria/breadcrumbs";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { useMemo } from "react";
import { mergeProps } from "@react-aria/utils";
function useBreadcrumbItem(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, breadcrumbItem.variantKeys);
  const {
    ref,
    as,
    className,
    children,
    isLast,
    separator,
    startContent,
    endContent,
    classNames,
    hideSeparator = false,
    ...otherProps
  } = props;
  const WrapperComponent = as || "li";
  const isCurrent = !!(originalProps == null ? void 0 : originalProps.isCurrent);
  const isDisabled = originalProps == null ? void 0 : originalProps.isDisabled;
  const Component = (originalProps == null ? void 0 : originalProps.href) && !isCurrent ? "a" : "span";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { itemProps } = useAriaBreadcrumbItem(
    { ...originalProps, isCurrent, elementType: Component },
    domRef
  );
  const { isFocusVisible, isFocused, focusProps } = useFocusRing();
  const slots = useMemo(
    () => breadcrumbItem({
      ...variantProps,
      isCurrent,
      underline: (originalProps == null ? void 0 : originalProps.underline) !== void 0 && !isCurrent ? originalProps == null ? void 0 : originalProps.underline : "none",
      className
    }),
    [objectToDeps(variantProps), isCurrent, className]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = () => ({
    ref: domRef,
    "data-slot": "base",
    className: slots.base({ class: baseStyles }),
    ...filterDOMProps(otherProps, {
      enabled: shouldFilterDOMProps
    })
  });
  const getItemProps = () => ({
    href: !isCurrent ? originalProps == null ? void 0 : originalProps.href : void 0,
    "data-slot": "item",
    "data-focus": dataAttr(isFocused),
    "data-focus-visible": dataAttr(isFocusVisible),
    "data-disabled": originalProps == null ? void 0 : originalProps.isDisabled,
    "data-current": originalProps == null ? void 0 : originalProps.isCurrent,
    className: slots.item({ class: classNames == null ? void 0 : classNames.item }),
    ...mergeProps(itemProps, isDisabled ? {} : focusProps)
  });
  const getSeparatorProps = () => ({
    "data-slot": "separator",
    "aria-hidden": dataAttr(true),
    className: slots.separator({ class: classNames == null ? void 0 : classNames.separator })
  });
  return {
    Component,
    WrapperComponent,
    children,
    separator,
    startContent,
    endContent,
    isDisabled,
    isCurrent,
    isLast,
    hideSeparator,
    getBaseProps,
    getItemProps,
    getSeparatorProps
  };
}

export {
  useBreadcrumbItem
};
