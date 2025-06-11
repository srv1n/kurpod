"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-avatar-group.ts
var use_avatar_group_exports = {};
__export(use_avatar_group_exports, {
  useAvatarGroup: () => useAvatarGroup
});
module.exports = __toCommonJS(use_avatar_group_exports);
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_react = require("react");
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
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const Component = as || "div";
  const context = (0, import_react.useMemo)(
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
  const slots = (0, import_react.useMemo)(() => (0, import_theme.avatarGroup)({ className, isGrid }), [className, isGrid]);
  const validChildren = (0, import_react_utils2.getValidChildren)(children);
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;
  const remainingCount = total ? total : max != null ? validChildren.length - max : -1;
  const clones = childrenWithinMax.map((child, index) => {
    const isFirstAvatar = index === 0;
    const isLastAvatar = index === childrenWithinMax.length - 1;
    const childProps = {
      className: (0, import_shared_utils.clsx)(
        isFirstAvatar ? "ms-0" : !isGrid ? "-ms-2" : "",
        isLastAvatar && remainingCount < 1 ? "hover:-translate-x-0" : ""
      )
    };
    return (0, import_react.cloneElement)(child, (0, import_shared_utils.compact)(childProps));
  });
  const getAvatarGroupProps = () => {
    return {
      ref: domRef,
      className: slots.base({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAvatarGroup
});
