import {
  useDivider
} from "./chunk-HGQPAK7A.mjs";

// src/divider.tsx
import { forwardRef } from "@nextui-org/system-rsc";
import { jsx } from "react/jsx-runtime";
var Divider = forwardRef((props, ref) => {
  const { Component, getDividerProps } = useDivider({ ...props });
  return /* @__PURE__ */ jsx(Component, { ref, ...getDividerProps() });
});
Divider.displayName = "NextUI.Divider";
var divider_default = Divider;

export {
  divider_default
};
