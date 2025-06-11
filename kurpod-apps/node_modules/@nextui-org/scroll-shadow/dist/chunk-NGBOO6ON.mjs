"use client";

// src/use-scroll-shadow.ts
import { mapPropsVariants } from "@nextui-org/system";
import { scrollShadow } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import {
  useDataScrollOverflow
} from "@nextui-org/use-data-scroll-overflow";
import { useMemo } from "react";
import { objectToDeps } from "@nextui-org/shared-utils";
function useScrollShadow(originalProps) {
  var _a;
  const [props, variantProps] = mapPropsVariants(originalProps, scrollShadow.variantKeys);
  const {
    ref,
    as,
    children,
    className,
    style,
    size = 40,
    offset = 0,
    visibility = "auto",
    isEnabled = true,
    onVisibilityChange,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  useDataScrollOverflow({
    domRef,
    offset,
    visibility,
    isEnabled,
    onVisibilityChange,
    updateDeps: [children],
    overflowCheck: (_a = originalProps.orientation) != null ? _a : "vertical"
  });
  const styles = useMemo(
    () => scrollShadow({
      ...variantProps,
      className
    }),
    [objectToDeps(variantProps), className]
  );
  const getBaseProps = (props2 = {}) => {
    var _a2;
    return {
      ref: domRef,
      className: styles,
      "data-orientation": (_a2 = originalProps.orientation) != null ? _a2 : "vertical",
      style: {
        "--scroll-shadow-size": `${size}px`,
        ...style,
        ...props2.style
      },
      ...otherProps,
      ...props2
    };
  };
  return { Component, styles, domRef, children, getBaseProps };
}

export {
  useScrollShadow
};
