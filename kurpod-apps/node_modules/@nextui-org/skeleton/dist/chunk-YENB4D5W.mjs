"use client";

// src/use-skeleton.ts
import { mapPropsVariants } from "@nextui-org/system";
import { skeleton } from "@nextui-org/theme";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { useMemo } from "react";
import { useProviderContext } from "@nextui-org/system";
function useSkeleton(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, skeleton.variantKeys);
  const { as, children, isLoaded = false, className, classNames, ...otherProps } = props;
  const Component = as || "div";
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const slots = useMemo(
    () => skeleton({
      ...variantProps,
      disableAnimation
    }),
    [objectToDeps(variantProps), disableAnimation, children]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getSkeletonProps = (props2 = {}) => {
    return {
      "data-loaded": dataAttr(isLoaded),
      className: slots.base({ class: clsx(baseStyles, props2 == null ? void 0 : props2.className) }),
      ...otherProps
    };
  };
  const getContentProps = (props2 = {}) => {
    return {
      className: slots.content({ class: clsx(classNames == null ? void 0 : classNames.content, props2 == null ? void 0 : props2.className) })
    };
  };
  return { Component, children, slots, classNames, getSkeletonProps, getContentProps };
}

export {
  useSkeleton
};
