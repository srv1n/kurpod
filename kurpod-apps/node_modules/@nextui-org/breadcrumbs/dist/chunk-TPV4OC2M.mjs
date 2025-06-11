"use client";
import {
  useBreadcrumbItem
} from "./chunk-HM6BKCEH.mjs";

// src/breadcrumb-item.tsx
import { forwardRef } from "@nextui-org/system";
import { jsx, jsxs } from "react/jsx-runtime";
var Breadcrumbs = forwardRef((props, ref) => {
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
  return /* @__PURE__ */ jsxs(WrapperComponent, { ...getBaseProps(), children: [
    /* @__PURE__ */ jsxs(Component, { ...getItemProps(), children: [
      startContent,
      children,
      endContent
    ] }),
    !isLast && !hideSeparator && /* @__PURE__ */ jsx("span", { ...getSeparatorProps(), children: separator })
  ] });
});
Breadcrumbs.displayName = "NextUI.Breadcrumbs";
var breadcrumb_item_default = Breadcrumbs;

export {
  breadcrumb_item_default
};
