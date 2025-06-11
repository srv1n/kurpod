"use client";

// src/use-tabs.ts
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { tabs } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, objectToDeps } from "@nextui-org/shared-utils";
import { filterDOMProps } from "@nextui-org/react-utils";
import { useMemo, useCallback } from "react";
import { useTabListState } from "@react-stately/tabs";
import { useTabList } from "@react-aria/tabs";
import { mergeProps } from "@react-aria/utils";
function useTabs(originalProps) {
  var _a, _b, _c;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, tabs.variantKeys);
  const {
    ref,
    as,
    className,
    classNames,
    children,
    disableCursorAnimation,
    motionProps,
    isVertical = false,
    shouldSelectOnPressUp = true,
    destroyInactiveTabPanel = true,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const state = useTabListState({
    children,
    ...otherProps
  });
  const { tabListProps } = useTabList(otherProps, state, domRef);
  const slots = useMemo(
    () => tabs({
      ...variantProps,
      className,
      disableAnimation,
      ...isVertical ? { placement: "start" } : {}
    }),
    [objectToDeps(variantProps), className, disableAnimation, isVertical]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const values = useMemo(
    () => ({
      state,
      slots,
      classNames,
      motionProps,
      disableAnimation,
      listRef: domRef,
      shouldSelectOnPressUp,
      disableCursorAnimation,
      isDisabled: originalProps == null ? void 0 : originalProps.isDisabled
    }),
    [
      state,
      slots,
      domRef,
      motionProps,
      disableAnimation,
      disableCursorAnimation,
      shouldSelectOnPressUp,
      originalProps == null ? void 0 : originalProps.isDisabled,
      classNames
    ]
  );
  const getBaseProps = useCallback(
    (props2) => ({
      "data-slot": "base",
      className: slots.base({ class: clsx(baseStyles, props2 == null ? void 0 : props2.className) }),
      ...mergeProps(
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        props2
      )
    }),
    [baseStyles, otherProps, slots]
  );
  const placement = (_c = variantProps.placement) != null ? _c : isVertical ? "start" : "top";
  const getWrapperProps = useCallback(
    (props2) => ({
      "data-slot": "tabWrapper",
      className: slots.wrapper({ class: clsx(classNames == null ? void 0 : classNames.wrapper, props2 == null ? void 0 : props2.className) }),
      "data-placement": placement,
      "data-vertical": isVertical || placement === "start" || placement === "end" ? "vertical" : "horizontal"
    }),
    [classNames, slots, placement, isVertical]
  );
  const getTabListProps = useCallback(
    (props2) => ({
      ref: domRef,
      "data-slot": "tabList",
      className: slots.tabList({ class: clsx(classNames == null ? void 0 : classNames.tabList, props2 == null ? void 0 : props2.className) }),
      ...mergeProps(tabListProps, props2)
    }),
    [domRef, tabListProps, classNames, slots]
  );
  return {
    Component,
    domRef,
    state,
    values,
    destroyInactiveTabPanel,
    getBaseProps,
    getTabListProps,
    getWrapperProps
  };
}

export {
  useTabs
};
