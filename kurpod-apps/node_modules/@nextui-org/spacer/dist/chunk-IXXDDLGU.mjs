import {
  useSpacer
} from "./chunk-XIKEQB64.mjs";

// src/spacer.tsx
import { forwardRef } from "@nextui-org/system-rsc";
import { jsx } from "react/jsx-runtime";
var Spacer = forwardRef((props, ref) => {
  const { Component, getSpacerProps } = useSpacer({ ...props });
  return /* @__PURE__ */ jsx(Component, { ref, ...getSpacerProps() });
});
Spacer.displayName = "NextUI.Spacer";
var spacer_default = Spacer;

export {
  spacer_default
};
