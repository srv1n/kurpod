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

// src/use-kbd.ts
var use_kbd_exports = {};
__export(use_kbd_exports, {
  useKbd: () => useKbd
});
module.exports = __toCommonJS(use_kbd_exports);
var import_system_rsc = require("@nextui-org/system-rsc");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
function useKbd(originalProps) {
  const [props, variantProps] = (0, import_system_rsc.mapPropsVariants)(originalProps, import_theme.kbd.variantKeys);
  const { as, children, className, keys, title, classNames, ...otherProps } = props;
  const Component = as || "kbd";
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.kbd)({
      ...variantProps
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps)]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const keysToRender = typeof keys === "string" ? [keys] : Array.isArray(keys) ? keys : [];
  const getKbdProps = (props2 = {}) => ({
    ...otherProps,
    ...props2,
    className: (0, import_shared_utils.clsx)(slots.base({ class: (0, import_shared_utils.clsx)(baseStyles, props2.className) }))
  });
  return { Component, slots, classNames, title, children, keysToRender, getKbdProps };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useKbd
});
