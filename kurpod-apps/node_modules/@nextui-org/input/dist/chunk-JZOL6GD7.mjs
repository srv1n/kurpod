"use client";
import {
  useInput
} from "./chunk-IEGJY7W3.mjs";

// src/input.tsx
import { CloseFilledIcon } from "@nextui-org/shared-icons";
import { useMemo } from "react";
import { forwardRef } from "@nextui-org/system";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Input = forwardRef((props, ref) => {
  const {
    Component,
    label,
    description,
    isClearable,
    startContent,
    endContent,
    labelPlacement,
    hasHelper,
    isOutsideLeft,
    shouldLabelBeOutside,
    errorMessage,
    isInvalid,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps
  } = useInput({ ...props, ref });
  const labelContent = label ? /* @__PURE__ */ jsx("label", { ...getLabelProps(), children: label }) : null;
  const end = useMemo(() => {
    if (isClearable) {
      return /* @__PURE__ */ jsx("button", { ...getClearButtonProps(), children: endContent || /* @__PURE__ */ jsx(CloseFilledIcon, {}) });
    }
    return endContent;
  }, [isClearable, getClearButtonProps]);
  const helperWrapper = useMemo(() => {
    const shouldShowError = isInvalid && errorMessage;
    const hasContent = shouldShowError || description;
    if (!hasHelper || !hasContent)
      return null;
    return /* @__PURE__ */ jsx("div", { ...getHelperWrapperProps(), children: shouldShowError ? /* @__PURE__ */ jsx("div", { ...getErrorMessageProps(), children: errorMessage }) : /* @__PURE__ */ jsx("div", { ...getDescriptionProps(), children: description }) });
  }, [
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps
  ]);
  const innerWrapper = useMemo(() => {
    return /* @__PURE__ */ jsxs("div", { ...getInnerWrapperProps(), children: [
      startContent,
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      end
    ] });
  }, [startContent, end, getInputProps, getInnerWrapperProps]);
  const mainWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return /* @__PURE__ */ jsxs("div", { ...getMainWrapperProps(), children: [
        /* @__PURE__ */ jsxs("div", { ...getInputWrapperProps(), children: [
          !isOutsideLeft ? labelContent : null,
          innerWrapper
        ] }),
        helperWrapper
      ] });
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { ...getInputWrapperProps(), children: [
        labelContent,
        innerWrapper
      ] }),
      helperWrapper
    ] });
  }, [
    labelPlacement,
    helperWrapper,
    shouldLabelBeOutside,
    labelContent,
    innerWrapper,
    errorMessage,
    description,
    getMainWrapperProps,
    getInputWrapperProps,
    getErrorMessageProps,
    getDescriptionProps
  ]);
  return /* @__PURE__ */ jsxs(Component, { ...getBaseProps(), children: [
    isOutsideLeft ? labelContent : null,
    mainWrapper
  ] });
});
Input.displayName = "NextUI.Input";
var input_default = Input;

export {
  input_default
};
