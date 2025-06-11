"use client";
import {
  useContextProps
} from "./chunk-BSTJ7ZCN.mjs";

// src/base-form.tsx
import { FormValidationContext } from "@react-stately/form";
import { createContext, forwardRef, useMemo } from "react";
import { form } from "@nextui-org/theme";
import { jsx } from "react/jsx-runtime";
var FormContext = createContext(null);
var Form = forwardRef(function Form2(props, ref) {
  [props, ref] = useContextProps(props, ref, FormContext);
  let { validationErrors, validationBehavior = "native", children, className, ...domProps } = props;
  const styles = useMemo(() => form({ className }), [className]);
  return /* @__PURE__ */ jsx("form", { noValidate: validationBehavior !== "native", ...domProps, ref, className: styles, children: /* @__PURE__ */ jsx(FormContext.Provider, { value: { ...props, validationBehavior }, children: /* @__PURE__ */ jsx(FormValidationContext.Provider, { value: validationErrors != null ? validationErrors : {}, children }) }) });
});

export {
  FormContext,
  Form
};
