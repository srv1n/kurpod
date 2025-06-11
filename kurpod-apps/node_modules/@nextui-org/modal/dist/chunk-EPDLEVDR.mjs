"use client";
import {
  useModalContext
} from "./chunk-6JNB4JMH.mjs";

// src/modal-body.tsx
import { useEffect } from "react";
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var ModalBody = forwardRef((props, ref) => {
  const { as, children, className, ...otherProps } = props;
  const { slots, classNames, bodyId, setBodyMounted } = useModalContext();
  const domRef = useDOMRef(ref);
  const Component = as || "div";
  useEffect(() => {
    setBodyMounted(true);
    return () => setBodyMounted(false);
  }, [setBodyMounted]);
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      className: slots.body({ class: clsx(classNames == null ? void 0 : classNames.body, className) }),
      id: bodyId,
      ...otherProps,
      children
    }
  );
});
ModalBody.displayName = "NextUI.ModalBody";
var modal_body_default = ModalBody;

export {
  modal_body_default
};
