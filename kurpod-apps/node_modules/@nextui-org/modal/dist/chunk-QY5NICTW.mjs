"use client";
import {
  useModalContext
} from "./chunk-6JNB4JMH.mjs";

// src/modal-footer.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var ModalFooter = forwardRef((props, ref) => {
  const { as, children, className, ...otherProps } = props;
  const { slots, classNames } = useModalContext();
  const domRef = useDOMRef(ref);
  const Component = as || "footer";
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      className: slots.footer({ class: clsx(classNames == null ? void 0 : classNames.footer, className) }),
      ...otherProps,
      children
    }
  );
});
ModalFooter.displayName = "NextUI.ModalFooter";
var modal_footer_default = ModalFooter;

export {
  modal_footer_default
};
