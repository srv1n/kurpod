"use client";
import {
  useNavbarContext
} from "./chunk-CLWTNWD4.mjs";

// src/navbar-content.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var NavbarContent = forwardRef((props, ref) => {
  var _a;
  const { as, className, children, justify = "start", ...otherProps } = props;
  const Component = as || "ul";
  const domRef = useDOMRef(ref);
  const { slots, classNames } = useNavbarContext();
  const styles = clsx(classNames == null ? void 0 : classNames.content, className);
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      className: (_a = slots.content) == null ? void 0 : _a.call(slots, { class: styles }),
      "data-justify": justify,
      ...otherProps,
      children
    }
  );
});
NavbarContent.displayName = "NextUI.NavbarContent";
var navbar_content_default = NavbarContent;

export {
  navbar_content_default
};
