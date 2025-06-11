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

// src/use-code.ts
var use_code_exports = {};
__export(use_code_exports, {
  useCode: () => useCode
});
module.exports = __toCommonJS(use_code_exports);
var import_theme = require("@nextui-org/theme");
var import_system_rsc = require("@nextui-org/system-rsc");
var import_react = require("react");
var import_shared_utils = require("@nextui-org/shared-utils");
function useCode(originalProps) {
  const [props, variantProps] = (0, import_system_rsc.mapPropsVariants)(originalProps, import_theme.code.variantKeys);
  const { as, children, className, ...otherProps } = props;
  const Component = as || "code";
  const classNames = (0, import_react.useMemo)(
    () => (0, import_theme.code)({
      ...variantProps,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), className]
  );
  const getCodeProps = () => {
    return {
      className: classNames,
      ...otherProps
    };
  };
  return { Component, children, getCodeProps };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCode
});
