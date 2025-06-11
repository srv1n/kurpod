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

// src/use-tabs.ts
var use_tabs_exports = {};
__export(use_tabs_exports, {
  useTabs: () => useTabs
});
module.exports = __toCommonJS(use_tabs_exports);
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_react = require("react");
var import_tabs = require("@react-stately/tabs");
var import_tabs2 = require("@react-aria/tabs");
var import_utils = require("@react-aria/utils");
function useTabs(originalProps) {
  var _a, _b, _c;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.tabs.variantKeys);
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
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const state = (0, import_tabs.useTabListState)({
    children,
    ...otherProps
  });
  const { tabListProps } = (0, import_tabs2.useTabList)(otherProps, state, domRef);
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.tabs)({
      ...variantProps,
      className,
      disableAnimation,
      ...isVertical ? { placement: "start" } : {}
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), className, disableAnimation, isVertical]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const values = (0, import_react.useMemo)(
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
  const getBaseProps = (0, import_react.useCallback)(
    (props2) => ({
      "data-slot": "base",
      className: slots.base({ class: (0, import_shared_utils.clsx)(baseStyles, props2 == null ? void 0 : props2.className) }),
      ...(0, import_utils.mergeProps)(
        (0, import_react_utils2.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        props2
      )
    }),
    [baseStyles, otherProps, slots]
  );
  const placement = (_c = variantProps.placement) != null ? _c : isVertical ? "start" : "top";
  const getWrapperProps = (0, import_react.useCallback)(
    (props2) => ({
      "data-slot": "tabWrapper",
      className: slots.wrapper({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.wrapper, props2 == null ? void 0 : props2.className) }),
      "data-placement": placement,
      "data-vertical": isVertical || placement === "start" || placement === "end" ? "vertical" : "horizontal"
    }),
    [classNames, slots, placement, isVertical]
  );
  const getTabListProps = (0, import_react.useCallback)(
    (props2) => ({
      ref: domRef,
      "data-slot": "tabList",
      className: slots.tabList({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.tabList, props2 == null ? void 0 : props2.className) }),
      ...(0, import_utils.mergeProps)(tabListProps, props2)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTabs
});
