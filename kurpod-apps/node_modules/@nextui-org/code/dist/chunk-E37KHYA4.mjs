import {
  useCode
} from "./chunk-VA7MLDKS.mjs";

// src/code.tsx
import { forwardRef } from "@nextui-org/system-rsc";
import { jsx } from "react/jsx-runtime";
var Code = forwardRef((props, ref) => {
  const { Component, children, getCodeProps } = useCode({ ...props });
  return /* @__PURE__ */ jsx(Component, { ref, ...getCodeProps(), children });
});
Code.displayName = "NextUI.Code";
var code_default = Code;

export {
  code_default
};
