"use client";
import {
  Form
} from "./chunk-YBBOLEEC.mjs";

// src/form.tsx
import { useProviderContext } from "@nextui-org/system";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Form2 = forwardRef(function Form3(props, ref) {
  var _a, _b;
  const globalContext = useProviderContext();
  const validationBehavior = (_b = (_a = props.validationBehavior) != null ? _a : globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _b : "aria";
  return /* @__PURE__ */ jsx(Form, { ...props, ref, validationBehavior });
});

export {
  Form2 as Form
};
