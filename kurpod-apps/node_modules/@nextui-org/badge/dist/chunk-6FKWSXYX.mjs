"use client";

// src/use-badge.ts
import { badge } from "@nextui-org/theme";
import { mapPropsVariants, useProviderContext } from "@nextui-org/system";
import { clsx, objectToDeps } from "@nextui-org/shared-utils";
import { useMemo } from "react";
function useBadge(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const [props, variantProps] = mapPropsVariants(originalProps, badge.variantKeys);
  const { as, children, className, content, classNames, ...otherProps } = props;
  const Component = as || "span";
  const isOneChar = useMemo(
    () => {
      var _a2;
      return ((_a2 = String(content)) == null ? void 0 : _a2.length) === 1 || (originalProps == null ? void 0 : originalProps.isOneChar);
    },
    [content, originalProps == null ? void 0 : originalProps.isOneChar]
  );
  const isDot = useMemo(() => {
    var _a2;
    return ((_a2 = String(content)) == null ? void 0 : _a2.length) === 0;
  }, [content]);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.badge, className);
  const slots = useMemo(
    () => badge({
      ...variantProps,
      showOutline: !!(originalProps == null ? void 0 : originalProps.disableOutline) ? !(originalProps == null ? void 0 : originalProps.disableOutline) : originalProps == null ? void 0 : originalProps.showOutline,
      isOneChar,
      isDot
    }),
    [objectToDeps(variantProps), isOneChar, isDot]
  );
  const getBadgeProps = () => {
    return {
      className: slots.badge({ class: baseStyles }),
      "data-invisible": originalProps.isInvisible,
      ...otherProps
    };
  };
  return {
    Component,
    children,
    content,
    slots,
    classNames,
    disableAnimation,
    isInvisible: originalProps == null ? void 0 : originalProps.isInvisible,
    getBadgeProps
  };
}

export {
  useBadge
};
