import {
  spacing
} from "./chunk-CH7FQ62Q.mjs";

// src/use-spacer.ts
import { mapPropsVariants } from "@nextui-org/system-rsc";
import { spacer } from "@nextui-org/theme";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { useMemo } from "react";
var getMargin = (value) => {
  var _a;
  return (_a = spacing[value]) != null ? _a : value;
};
function useSpacer(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, spacer.variantKeys);
  const { as, className, x = 1, y = 1, ...otherProps } = props;
  const Component = as || "span";
  const styles = useMemo(
    () => spacer({
      ...variantProps,
      className
    }),
    [objectToDeps(variantProps), className]
  );
  const marginLeft = getMargin(x);
  const marginTop = getMargin(y);
  const getSpacerProps = (props2 = {}) => ({
    ...props2,
    ...otherProps,
    "aria-hidden": dataAttr(true),
    className: clsx(styles, props2.className),
    style: {
      ...props2.style,
      ...otherProps.style,
      marginLeft,
      marginTop
    }
  });
  return { Component, getSpacerProps };
}

export {
  getMargin,
  useSpacer
};
