"use client";
import {
  breadcrumb_item_default
} from "./chunk-TPV4OC2M.mjs";

// src/use-breadcrumbs.ts
import { Children } from "react";
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { breadcrumbs } from "@nextui-org/theme";
import { filterDOMProps, pickChildren, useDOMRef } from "@nextui-org/react-utils";
import { mergeProps } from "@react-aria/utils";
import { useBreadcrumbs as useAriaBreadcrumbs } from "@react-aria/breadcrumbs";
import { useMemo } from "react";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
function useBreadcrumbs(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const [props, variantProps] = mapPropsVariants(originalProps, breadcrumbs.variantKeys);
  const {
    ref,
    as,
    color,
    underline,
    isDisabled,
    separator,
    children: childrenProp,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 2,
    maxItems = 8,
    hideSeparator,
    renderEllipsis,
    className,
    classNames,
    itemClasses,
    onAction,
    ...otherProps
  } = props;
  const Component = as || "nav";
  const shouldFilterDOMProps = typeof Component === "string";
  const { navProps } = useAriaBreadcrumbs(originalProps);
  const [, children] = pickChildren(childrenProp, breadcrumb_item_default);
  const childCount = Children.count(children);
  const domRef = useDOMRef(ref);
  const slots = useMemo(
    () => breadcrumbs({
      ...variantProps,
      className
    }),
    [objectToDeps(variantProps), className]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const itemProps = {
    color,
    underline,
    disableAnimation,
    hideSeparator,
    size: originalProps == null ? void 0 : originalProps.size,
    classNames: itemClasses
  };
  const getBaseProps = () => ({
    ref: domRef,
    "data-slot": "base",
    className: slots.base({ class: baseStyles }),
    ...mergeProps(
      navProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps
      })
    )
  });
  const getListProps = () => ({
    "data-slot": "list",
    className: slots.list({ class: classNames == null ? void 0 : classNames.list })
  });
  const getEllipsisProps = () => ({
    "data-slot": "ellipsis",
    className: slots.ellipsis({ class: classNames == null ? void 0 : classNames.ellipsis })
  });
  const getSeparatorProps = () => ({
    "data-slot": "separator",
    "aria-hidden": dataAttr(true),
    className: slots.separator({ class: classNames == null ? void 0 : classNames.separator })
  });
  return {
    Component,
    children,
    slots,
    separator,
    childCount,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    classNames,
    isDisabled,
    itemProps,
    renderEllipsis,
    getBaseProps,
    getListProps,
    getEllipsisProps,
    getSeparatorProps,
    onAction
  };
}

export {
  useBreadcrumbs
};
