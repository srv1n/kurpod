"use client";

// src/use-avatar-group.ts
import { avatarGroup } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, compact } from "@nextui-org/shared-utils";
import { getValidChildren } from "@nextui-org/react-utils";
import { cloneElement, useMemo } from "react";
function useAvatarGroup(props = {}) {
  const {
    as,
    ref,
    max = 5,
    total,
    size,
    color,
    radius,
    children,
    isBordered,
    isDisabled,
    isGrid,
    renderCount,
    className,
    classNames,
    ...otherProps
  } = props;
  const domRef = useDOMRef(ref);
  const Component = as || "div";
  const context = useMemo(
    () => ({
      size,
      color,
      radius,
      isGrid,
      isBordered,
      isDisabled
    }),
    [size, color, radius, isGrid, isBordered, isDisabled]
  );
  const slots = useMemo(() => avatarGroup({ className, isGrid }), [className, isGrid]);
  const validChildren = getValidChildren(children);
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;
  const remainingCount = total ? total : max != null ? validChildren.length - max : -1;
  const clones = childrenWithinMax.map((child, index) => {
    const isFirstAvatar = index === 0;
    const isLastAvatar = index === childrenWithinMax.length - 1;
    const childProps = {
      className: clsx(
        isFirstAvatar ? "ms-0" : !isGrid ? "-ms-2" : "",
        isLastAvatar && remainingCount < 1 ? "hover:-translate-x-0" : ""
      )
    };
    return cloneElement(child, compact(childProps));
  });
  const getAvatarGroupProps = () => {
    return {
      ref: domRef,
      className: slots.base({
        class: clsx(classNames == null ? void 0 : classNames.base, className)
      }),
      role: "group",
      ...otherProps
    };
  };
  const getAvatarGroupCountProps = () => {
    return {
      className: slots.count({
        class: classNames == null ? void 0 : classNames.count
      })
    };
  };
  return {
    Component,
    context,
    remainingCount,
    clones,
    renderCount,
    getAvatarGroupProps,
    getAvatarGroupCountProps
  };
}

export {
  useAvatarGroup
};
