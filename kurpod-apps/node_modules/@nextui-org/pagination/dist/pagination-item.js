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

// src/pagination-item.tsx
var pagination_item_exports = {};
__export(pagination_item_exports, {
  default: () => pagination_item_default
});
module.exports = __toCommonJS(pagination_item_exports);
var import_system = require("@nextui-org/system");

// src/use-pagination-item.ts
var import_react = require("react");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
var import_react_utils = require("@nextui-org/react-utils");
var import_interactions = require("@react-aria/interactions");
var import_focus = require("@react-aria/focus");
function usePaginationItem(props) {
  const {
    as,
    ref,
    value,
    children,
    isActive,
    isDisabled,
    onPress,
    onClick,
    getAriaLabel,
    className,
    ...otherProps
  } = props;
  const isLink = !!(props == null ? void 0 : props.href);
  const Component = as || isLink ? "a" : "li";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const router = (0, import_utils.useRouter)();
  const ariaLabel = (0, import_react.useMemo)(
    () => isActive ? `${getAriaLabel == null ? void 0 : getAriaLabel(value)} active` : getAriaLabel == null ? void 0 : getAriaLabel(value),
    [value, isActive]
  );
  const { isPressed, pressProps } = (0, import_interactions.usePress)({
    isDisabled,
    onPress
  });
  const { focusProps, isFocused, isFocusVisible } = (0, import_focus.useFocusRing)({});
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  const getItemProps = (props2 = {}) => {
    return {
      ref: domRef,
      role: "button",
      tabIndex: isDisabled ? -1 : 0,
      "aria-label": ariaLabel,
      "aria-current": (0, import_shared_utils.dataAttr)(isActive),
      "aria-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-active": (0, import_shared_utils.dataAttr)(isActive),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      ...(0, import_utils.mergeProps)(
        props2,
        pressProps,
        focusProps,
        hoverProps,
        (0, import_react_utils.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        })
      ),
      className: (0, import_shared_utils.clsx)(className, props2.className),
      onClick: (e) => {
        (0, import_utils.chain)(pressProps == null ? void 0 : pressProps.onClick, onClick)(e);
        if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && !e.isDefaultPrevented() && (0, import_utils.shouldClientNavigate)(e.currentTarget, e) && props2.href) {
          e.preventDefault();
          router.open(e.currentTarget, e, props2.href, props2.routerOptions);
        }
      }
    };
  };
  return {
    Component,
    children,
    ariaLabel,
    isFocused,
    isFocusVisible,
    getItemProps
  };
}

// src/pagination-item.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PaginationItem = (0, import_system.forwardRef)((props, ref) => {
  const { Component, children, getItemProps } = usePaginationItem({ ...props, ref });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...getItemProps(), children });
});
PaginationItem.displayName = "NextUI.PaginationItem";
var pagination_item_default = PaginationItem;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
