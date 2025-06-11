"use client";
import {
  usePaginationItem
} from "./chunk-TEHPZN3P.mjs";

// src/pagination-item.tsx
import { forwardRef } from "@nextui-org/system";
import { jsx } from "react/jsx-runtime";
var PaginationItem = forwardRef((props, ref) => {
  const { Component, children, getItemProps } = usePaginationItem({ ...props, ref });
  return /* @__PURE__ */ jsx(Component, { ...getItemProps(), children });
});
PaginationItem.displayName = "NextUI.PaginationItem";
var pagination_item_default = PaginationItem;

export {
  pagination_item_default
};
