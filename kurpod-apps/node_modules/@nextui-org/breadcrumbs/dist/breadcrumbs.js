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

// src/breadcrumbs.tsx
var breadcrumbs_exports = {};
__export(breadcrumbs_exports, {
  default: () => breadcrumbs_default
});
module.exports = __toCommonJS(breadcrumbs_exports);
var import_react4 = require("react");
var import_system4 = require("@nextui-org/system");
var import_shared_icons = require("@nextui-org/shared-icons");
var import_shared_utils3 = require("@nextui-org/shared-utils");
var import_utils3 = require("@react-aria/utils");

// src/use-breadcrumbs.ts
var import_react2 = require("react");
var import_system3 = require("@nextui-org/system");
var import_theme2 = require("@nextui-org/theme");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_utils2 = require("@react-aria/utils");
var import_breadcrumbs2 = require("@react-aria/breadcrumbs");
var import_react3 = require("react");
var import_shared_utils2 = require("@nextui-org/shared-utils");

// src/breadcrumb-item.tsx
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

// src/use-breadcrumbs.ts
function useBreadcrumbs(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system3.useProviderContext)();
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const [props, variantProps] = (0, import_system3.mapPropsVariants)(originalProps, import_theme2.breadcrumbs.variantKeys);
  const {
    ref,
    as,
    color,
    underline,
    isDisabled,
    separator,
    children: childrenProp,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 2,
    maxItems = 8,
    hideSeparator,
    renderEllipsis,
    className,
    classNames,
    itemClasses,
    onAction,
    ...otherProps
  } = props;
  const Component = as || "nav";
  const shouldFilterDOMProps = typeof Component === "string";
  const { navProps } = (0, import_breadcrumbs2.useBreadcrumbs)(originalProps);
  const [, children] = (0, import_react_utils2.pickChildren)(childrenProp, breadcrumb_item_default);
  const childCount = import_react2.Children.count(children);
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const slots = (0, import_react3.useMemo)(
    () => (0, import_theme2.breadcrumbs)({
      ...variantProps,
      className
    }),
    [(0, import_shared_utils2.objectToDeps)(variantProps), className]
  );
  const baseStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.base, className);
  const itemProps = {
    color,
    underline,
    disableAnimation,
    hideSeparator,
    size: originalProps == null ? void 0 : originalProps.size,
    classNames: itemClasses
  };
  const getBaseProps = () => ({
    ref: domRef,
    "data-slot": "base",
    className: slots.base({ class: baseStyles }),
    ...(0, import_utils2.mergeProps)(
      navProps,
      (0, import_react_utils2.filterDOMProps)(otherProps, {
        enabled: shouldFilterDOMProps
      })
    )
  });
  const getListProps = () => ({
    "data-slot": "list",
    className: slots.list({ class: classNames == null ? void 0 : classNames.list })
  });
  const getEllipsisProps = () => ({
    "data-slot": "ellipsis",
    className: slots.ellipsis({ class: classNames == null ? void 0 : classNames.ellipsis })
  });
  const getSeparatorProps = () => ({
    "data-slot": "separator",
    "aria-hidden": (0, import_shared_utils2.dataAttr)(true),
    className: slots.separator({ class: classNames == null ? void 0 : classNames.separator })
  });
  return {
    Component,
    children,
    slots,
    separator,
    childCount,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    classNames,
    isDisabled,
    itemProps,
    renderEllipsis,
    getBaseProps,
    getListProps,
    getEllipsisProps,
    getSeparatorProps,
    onAction
  };
}

// src/breadcrumbs.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Breadcrumbs2 = (0, import_system4.forwardRef)((props, ref) => {
  const {
    Component,
    children,
    childCount,
    itemProps,
    separator = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_shared_icons.ChevronRightIcon, {}),
    maxItems,
    itemsBeforeCollapse,
    itemsAfterCollapse,
    isDisabled,
    renderEllipsis,
    getBaseProps,
    getListProps,
    getEllipsisProps,
    getSeparatorProps,
    onAction
  } = useBreadcrumbs({
    ...props,
    ref
  });
  const content = (0, import_react4.useMemo)(() => {
    let items = children == null ? void 0 : children.map((child, i) => {
      var _a;
      const isLast = i === childCount - 1;
      const itemKey = (child == null ? void 0 : child.key) || i;
      return (0, import_react4.cloneElement)(child, {
        ...itemProps,
        isLast,
        separator,
        isDisabled: isDisabled && !isLast,
        isCurrent: isLast || child.props.isCurrent,
        ...child.props,
        key: itemKey,
        onPress: (0, import_utils3.chain)((_a = child.props) == null ? void 0 : _a.onPress, () => onAction == null ? void 0 : onAction(itemKey))
      });
    });
    if (!items)
      return null;
    if (childCount < maxItems) {
      return items;
    }
    if (itemsBeforeCollapse + itemsAfterCollapse >= childCount) {
      (0, import_shared_utils3.warn)(
        `You have provided an invalid combination of props to the Breadcrumbs. itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= itemsCount={${childCount}}`,
        "Breadcrumbs"
      );
      return items;
    }
    const itemsInEllipsis = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);
    if (itemsInEllipsis.length < 1) {
      return items;
    }
    const ellipsisIcon = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_shared_icons.EllipsisIcon, { ...getEllipsisProps() });
    const collapsedItem = (0, import_react4.cloneElement)(itemsInEllipsis[0], {
      ...itemsInEllipsis[0].props,
      key: "ellipsis",
      children: ellipsisIcon
    });
    const ellipsisItem = typeof renderEllipsis === "function" ? renderEllipsis({
      collapsedItem,
      items: itemsInEllipsis.map((item) => item.props),
      maxItems,
      ellipsisIcon,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      separator: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getSeparatorProps(), children: separator })
    }) : collapsedItem;
    return [
      ...items.slice(0, itemsBeforeCollapse),
      ellipsisItem,
      ...items.slice(items.length - itemsAfterCollapse, items.length)
    ];
  }, [
    children,
    childCount,
    separator,
    itemProps,
    itemsBeforeCollapse,
    itemsAfterCollapse,
    isDisabled
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, { ...getBaseProps(), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ol", { ...getListProps(), children: content }) });
});
Breadcrumbs2.displayName = "NextUI.Breadcrumbs";
var breadcrumbs_default = Breadcrumbs2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
