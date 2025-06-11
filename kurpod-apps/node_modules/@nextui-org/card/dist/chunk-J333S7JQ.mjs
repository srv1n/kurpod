"use client";
import {
  useCardContext
} from "./chunk-QVMTN7ZJ.mjs";

// src/card-header.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var CardHeader = forwardRef((props, ref) => {
  var _a;
  const { as, className, children, ...otherProps } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const { slots, classNames } = useCardContext();
  const headerStyles = clsx(classNames == null ? void 0 : classNames.header, className);
  return /* @__PURE__ */ jsx(Component, { ref: domRef, className: (_a = slots.header) == null ? void 0 : _a.call(slots, { class: headerStyles }), ...otherProps, children });
});
CardHeader.displayName = "NextUI.CardHeader";
var card_header_default = CardHeader;

export {
  card_header_default
};
