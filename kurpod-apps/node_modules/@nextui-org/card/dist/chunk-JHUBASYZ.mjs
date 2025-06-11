"use client";
import {
  useCardContext
} from "./chunk-QVMTN7ZJ.mjs";

// src/card-footer.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var CardFooter = forwardRef((props, ref) => {
  var _a;
  const { as, className, children, ...otherProps } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const { slots, classNames } = useCardContext();
  const footerStyles = clsx(classNames == null ? void 0 : classNames.footer, className);
  return /* @__PURE__ */ jsx(Component, { ref: domRef, className: (_a = slots.footer) == null ? void 0 : _a.call(slots, { class: footerStyles }), ...otherProps, children });
});
CardFooter.displayName = "NextUI.CardFooter";
var card_footer_default = CardFooter;

export {
  card_footer_default
};
