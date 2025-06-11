"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-accordion.ts
var use_accordion_exports = {};
__export(use_accordion_exports, {
  useAccordion: () => useAccordion
});
module.exports = __toCommonJS(use_accordion_exports);
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_react = __toESM(require("react"));
var import_tree = require("@react-stately/tree");
var import_utils = require("@react-aria/utils");
var import_theme = require("@nextui-org/theme");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_react2 = require("react");
var import_use_aria_accordion = require("@nextui-org/use-aria-accordion");
function useAccordion(props) {
  var _a;
  const globalContext = (0, import_system.useProviderContext)();
  const {
    ref,
    as,
    className,
    items,
    variant,
    motionProps,
    expandedKeys,
    disabledKeys,
    selectedKeys,
    children: childrenProp,
    defaultExpandedKeys,
    selectionMode = "single",
    selectionBehavior = "toggle",
    keepContentMounted = false,
    disallowEmptySelection,
    defaultSelectedKeys,
    onExpandedChange,
    onSelectionChange,
    dividerProps = {},
    isCompact = false,
    isDisabled = false,
    showDivider = true,
    hideIndicator = false,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    disableIndicatorAnimation = false,
    itemClasses,
    ...otherProps
  } = props;
  const [focusedKey, setFocusedKey] = (0, import_react2.useState)(null);
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const classNames = (0, import_react2.useMemo)(
    () => (0, import_theme.accordion)({
      variant,
      className
    }),
    [variant, className]
  );
  const children = (0, import_react2.useMemo)(() => {
    let treeChildren = [];
    import_react.default.Children.map(childrenProp, (child) => {
      var _a2;
      if (import_react.default.isValidElement(child) && typeof ((_a2 = child.props) == null ? void 0 : _a2.children) !== "string") {
        const clonedChild = import_react.default.cloneElement(child, {
          hasChildItems: false
        });
        treeChildren.push(clonedChild);
      } else {
        treeChildren.push(child);
      }
    });
    return treeChildren;
  }, [childrenProp]);
  const commonProps = {
    children,
    items
  };
  const expandableProps = {
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange
  };
  const treeProps = {
    disabledKeys,
    selectedKeys,
    selectionMode,
    selectionBehavior,
    disallowEmptySelection,
    defaultSelectedKeys: defaultSelectedKeys != null ? defaultSelectedKeys : defaultExpandedKeys,
    onSelectionChange,
    ...commonProps,
    ...expandableProps
  };
  const state = (0, import_tree.useTreeState)(treeProps);
  state.selectionManager.setFocusedKey = (key) => {
    setFocusedKey(key);
  };
  const { accordionProps } = (0, import_use_aria_accordion.useReactAriaAccordion)(
    {
      ...commonProps,
      ...expandableProps
    },
    state,
    domRef
  );
  const values = (0, import_react2.useMemo)(
    () => ({
      state,
      focusedKey,
      motionProps,
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      keepContentMounted,
      disableIndicatorAnimation
    }),
    [
      focusedKey,
      isCompact,
      isDisabled,
      hideIndicator,
      selectedKeys,
      disableAnimation,
      keepContentMounted,
      state == null ? void 0 : state.expandedKeys.values,
      disableIndicatorAnimation,
      state.expandedKeys.size,
      state.disabledKeys.size,
      motionProps
    ]
  );
  const getBaseProps = (0, import_react.useCallback)((props2 = {}) => {
    return {
      ref: domRef,
      className: classNames,
      "data-orientation": "vertical",
      ...(0, import_utils.mergeProps)(
        accordionProps,
        (0, import_react_utils.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        props2
      )
    };
  }, []);
  const handleFocusChanged = (0, import_react.useCallback)((isFocused, key) => {
    isFocused && setFocusedKey(key);
  }, []);
  return {
    Component,
    values,
    state,
    focusedKey,
    getBaseProps,
    isSplitted: variant === "splitted",
    classNames,
    showDivider,
    dividerProps,
    disableAnimation,
    handleFocusChanged,
    itemClasses
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAccordion
});
