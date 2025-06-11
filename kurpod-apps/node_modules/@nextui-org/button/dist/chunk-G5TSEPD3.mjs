"use client";
import {
  useButton
} from "./chunk-BZOXOCYW.mjs";

// src/button.tsx
import { Spinner } from "@nextui-org/spinner";
import { Ripple } from "@nextui-org/ripple";
import { forwardRef } from "@nextui-org/system";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = forwardRef((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    spinnerSize,
    spinner = /* @__PURE__ */ jsx(Spinner, { color: "current", size: spinnerSize }),
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly
  } = useButton({ ...props, ref });
  return /* @__PURE__ */ jsxs(Component, { ref: domRef, className: styles, ...getButtonProps(), children: [
    startContent,
    isLoading && spinnerPlacement === "start" && spinner,
    isLoading && isIconOnly ? null : children,
    isLoading && spinnerPlacement === "end" && spinner,
    endContent,
    !disableRipple && /* @__PURE__ */ jsx(Ripple, { ...getRippleProps() })
  ] });
});
Button.displayName = "NextUI.Button";
var button_default = Button;

export {
  button_default
};
