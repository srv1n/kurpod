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

// src/use-spacer.ts
var use_spacer_exports = {};
__export(use_spacer_exports, {
  getMargin: () => getMargin,
  useSpacer: () => useSpacer
});
module.exports = __toCommonJS(use_spacer_exports);
var import_system_rsc = require("@nextui-org/system-rsc");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");

// src/utils.ts
var spacing = {
  px: "1px",
  0: "0px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};

// src/use-spacer.ts
var getMargin = (value) => {
  var _a;
  return (_a = spacing[value]) != null ? _a : value;
};
function useSpacer(originalProps) {
  const [props, variantProps] = (0, import_system_rsc.mapPropsVariants)(originalProps, import_theme.spacer.variantKeys);
  const { as, className, x = 1, y = 1, ...otherProps } = props;
  const Component = as || "span";
  const styles = (0, import_react.useMemo)(
    () => (0, import_theme.spacer)({
      ...variantProps,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), className]
  );
  const marginLeft = getMargin(x);
  const marginTop = getMargin(y);
  const getSpacerProps = (props2 = {}) => ({
    ...props2,
    ...otherProps,
    "aria-hidden": (0, import_shared_utils.dataAttr)(true),
    className: (0, import_shared_utils.clsx)(styles, props2.className),
    style: {
      ...props2.style,
      ...otherProps.style,
      marginLeft,
      marginTop
    }
  });
  return { Component, getSpacerProps };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMargin,
  useSpacer
});
