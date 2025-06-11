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

// src/use-scroll-shadow.ts
var use_scroll_shadow_exports = {};
__export(use_scroll_shadow_exports, {
  useScrollShadow: () => useScrollShadow
});
module.exports = __toCommonJS(use_scroll_shadow_exports);
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_use_data_scroll_overflow = require("@nextui-org/use-data-scroll-overflow");
var import_react = require("react");
var import_shared_utils = require("@nextui-org/shared-utils");
function useScrollShadow(originalProps) {
  var _a;
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.scrollShadow.variantKeys);
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
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  (0, import_use_data_scroll_overflow.useDataScrollOverflow)({
    domRef,
    offset,
    visibility,
    isEnabled,
    onVisibilityChange,
    updateDeps: [children],
    overflowCheck: (_a = originalProps.orientation) != null ? _a : "vertical"
  });
  const styles = (0, import_react.useMemo)(
    () => (0, import_theme.scrollShadow)({
      ...variantProps,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), className]
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useScrollShadow
});
