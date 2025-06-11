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

// src/use-skeleton.ts
var use_skeleton_exports = {};
__export(use_skeleton_exports, {
  useSkeleton: () => useSkeleton
});
module.exports = __toCommonJS(use_skeleton_exports);
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
var import_system2 = require("@nextui-org/system");
function useSkeleton(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system2.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.skeleton.variantKeys);
  const { as, children, isLoaded = false, className, classNames, ...otherProps } = props;
  const Component = as || "div";
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.skeleton)({
      ...variantProps,
      disableAnimation
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation, children]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getSkeletonProps = (props2 = {}) => {
    return {
      "data-loaded": (0, import_shared_utils.dataAttr)(isLoaded),
      className: slots.base({ class: (0, import_shared_utils.clsx)(baseStyles, props2 == null ? void 0 : props2.className) }),
      ...otherProps
    };
  };
  const getContentProps = (props2 = {}) => {
    return {
      className: slots.content({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.content, props2 == null ? void 0 : props2.className) })
    };
  };
  return { Component, children, slots, classNames, getSkeletonProps, getContentProps };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSkeleton
});
