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

// src/use-listbox.ts
var use_listbox_exports = {};
__export(use_listbox_exports, {
  useListbox: () => useListbox
});
module.exports = __toCommonJS(use_listbox_exports);
var import_listbox = require("@react-aria/listbox");
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_list = require("@react-stately/list");
var import_react_utils = require("@nextui-org/react-utils");
var import_react = require("react");
var import_shared_utils = require("@nextui-org/shared-utils");
function useListbox(props) {
  var _a;
  const globalContext = (0, import_system.useProviderContext)();
  const {
    ref,
    as,
    state: propState,
    variant,
    color,
    onAction,
    children,
    onSelectionChange,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    itemClasses,
    className,
    topContent,
    bottomContent,
    emptyContent = "No items.",
    hideSelectedIcon = false,
    hideEmptyContent = false,
    shouldHighlightOnFocus = false,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "ul";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const innerState = (0, import_list.useListState)({ ...props, children, onSelectionChange });
  const state = propState || innerState;
  const { listBoxProps } = (0, import_listbox.useListBox)({ ...props, onAction }, state, domRef);
  const slots = (0, import_react.useMemo)(() => (0, import_theme.listbox)({ className }), [className]);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (props2 = {}) => {
    return {
      ref: domRef,
      "data-slot": "base",
      className: slots.base({ class: baseStyles }),
      ...(0, import_react_utils.filterDOMProps)(otherProps, {
        enabled: shouldFilterDOMProps
      }),
      ...props2
    };
  };
  const getListProps = (props2 = {}) => {
    return {
      "data-slot": "list",
      className: slots.list({ class: classNames == null ? void 0 : classNames.list }),
      ...listBoxProps,
      ...props2
    };
  };
  const getEmptyContentProps = (props2 = {}) => {
    return {
      "data-slot": "empty-content",
      children: emptyContent,
      className: slots.emptyContent({ class: classNames == null ? void 0 : classNames.emptyContent }),
      ...props2
    };
  };
  return {
    Component,
    state,
    variant,
    color,
    slots,
    classNames,
    topContent,
    bottomContent,
    emptyContent,
    hideEmptyContent,
    shouldHighlightOnFocus,
    hideSelectedIcon,
    disableAnimation,
    className,
    itemClasses,
    getBaseProps,
    getListProps,
    getEmptyContentProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useListbox
});
