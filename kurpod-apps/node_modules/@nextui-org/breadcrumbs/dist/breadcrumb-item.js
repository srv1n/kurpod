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

// src/breadcrumb-item.tsx
var breadcrumb_item_exports = {};
__export(breadcrumb_item_exports, {
  default: () => breadcrumb_item_default
});
module.exports = __toCommonJS(breadcrumb_item_exports);
var import_system2 = require("@nextui-org/system");

// src/use-breadcrumb-item.ts
var import_system = require("@nextui-org/system");
var import_focus = require("@react-aria/focus");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_breadcrumbs = require("@react-aria/breadcrumbs");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react = require("react");
var import_utils = require("@react-aria/utils");
function useBreadcrumbItem(originalProps) {
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.breadcrumbItem.variantKeys);
  const {
    ref,
    as,
    className,
    children,
    isLast,
    separator,
    startContent,
    endContent,
    classNames,
    hideSeparator = false,
    ...otherProps
  } = props;
  const WrapperComponent = as || "li";
  const isCurrent = !!(originalProps == null ? void 0 : originalProps.isCurrent);
  const isDisabled = originalProps == null ? void 0 : originalProps.isDisabled;
  const Component = (originalProps == null ? void 0 : originalProps.href) && !isCurrent ? "a" : "span";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { itemProps } = (0, import_breadcrumbs.useBreadcrumbItem)(
    { ...originalProps, isCurrent, elementType: Component },
    domRef
  );
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)();
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.breadcrumbItem)({
      ...variantProps,
      isCurrent,
      underline: (originalProps == null ? void 0 : originalProps.underline) !== void 0 && !isCurrent ? originalProps == null ? void 0 : originalProps.underline : "none",
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), isCurrent, className]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = () => ({
    ref: domRef,
    "data-slot": "base",
    className: slots.base({ class: baseStyles }),
    ...(0, import_react_utils.filterDOMProps)(otherProps, {
      enabled: shouldFilterDOMProps
    })
  });
  const getItemProps = () => ({
    href: !isCurrent ? originalProps == null ? void 0 : originalProps.href : void 0,
    "data-slot": "item",
    "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
    "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
    "data-disabled": originalProps == null ? void 0 : originalProps.isDisabled,
    "data-current": originalProps == null ? void 0 : originalProps.isCurrent,
    className: slots.item({ class: classNames == null ? void 0 : classNames.item }),
    ...(0, import_utils.mergeProps)(itemProps, isDisabled ? {} : focusProps)
  });
  const getSeparatorProps = () => ({
    "data-slot": "separator",
    "aria-hidden": (0, import_shared_utils.dataAttr)(true),
    className: slots.separator({ class: classNames == null ? void 0 : classNames.separator })
  });
  return {
    Component,
    WrapperComponent,
    children,
    separator,
    startContent,
    endContent,
    isDisabled,
    isCurrent,
    isLast,
    hideSeparator,
    getBaseProps,
    getItemProps,
    getSeparatorProps
  };
}

// src/breadcrumb-item.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Breadcrumbs = (0, import_system2.forwardRef)((props, ref) => {
  const {
    Component,
    WrapperComponent,
    children,
    isLast,
    separator,
    startContent,
    endContent,
    hideSeparator,
    getBaseProps,
    getItemProps,
    getSeparatorProps
  } = useBreadcrumbItem({
    ...props,
    ref
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WrapperComponent, { ...getBaseProps(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...getItemProps(), children: [
      startContent,
      children,
      endContent
    ] }),
    !isLast && !hideSeparator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getSeparatorProps(), children: separator })
  ] });
});
Breadcrumbs.displayName = "NextUI.Breadcrumbs";
var breadcrumb_item_default = Breadcrumbs;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
