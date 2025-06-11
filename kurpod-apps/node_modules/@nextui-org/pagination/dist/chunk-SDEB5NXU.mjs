"use client";

// src/pagination-cursor.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { jsx } from "react/jsx-runtime";
var PaginationCursor = forwardRef((props, ref) => {
  const { as, activePage, ...otherProps } = props;
  const Component = as || "span";
  const domRef = useDOMRef(ref);
  return /* @__PURE__ */ jsx(Component, { ref: domRef, "aria-hidden": true, ...otherProps, children: activePage });
});
PaginationCursor.displayName = "NextUI.PaginationCursor";
var pagination_cursor_default = PaginationCursor;

export {
  pagination_cursor_default
};
