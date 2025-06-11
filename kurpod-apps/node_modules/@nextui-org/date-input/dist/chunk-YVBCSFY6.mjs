"use client";

// src/date-input-group.tsx
import { useMemo } from "react";
import { forwardRef } from "@nextui-org/system";
import { dataAttr } from "@nextui-org/shared-utils";
import { jsx, jsxs } from "react/jsx-runtime";
var DateInputGroup = forwardRef((props, ref) => {
  const {
    as,
    label,
    children,
    description,
    startContent,
    endContent,
    errorMessage: errorMessageProp,
    shouldLabelBeOutside,
    isInvalid,
    groupProps,
    labelProps,
    wrapperProps,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    validationDetails,
    ...otherProps
  } = props;
  const Component = as || "div";
  const labelContent = label ? /* @__PURE__ */ jsx("span", { ...labelProps, children: label }) : null;
  const errorMessage = typeof errorMessageProp === "function" ? errorMessageProp({
    isInvalid,
    validationErrors,
    validationDetails
  }) : errorMessageProp || (validationErrors == null ? void 0 : validationErrors.join(" "));
  const hasHelper = !!description || !!errorMessage;
  const helperWrapper = useMemo(() => {
    if (!hasHelper)
      return null;
    return /* @__PURE__ */ jsx("div", { ...helperWrapperProps, children: isInvalid && errorMessage ? /* @__PURE__ */ jsx("div", { ...errorMessageProps, children: errorMessage }) : description ? /* @__PURE__ */ jsx("div", { ...descriptionProps, children: description }) : null });
  }, [
    hasHelper,
    errorMessage,
    description,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps
  ]);
  return /* @__PURE__ */ jsxs(Component, { ...otherProps, ref, "data-has-helper": dataAttr(hasHelper), children: [
    shouldLabelBeOutside ? labelContent : null,
    /* @__PURE__ */ jsxs("div", { ...groupProps, children: [
      !shouldLabelBeOutside ? labelContent : null,
      /* @__PURE__ */ jsxs("div", { ...wrapperProps, children: [
        startContent,
        children,
        endContent
      ] }),
      shouldLabelBeOutside ? helperWrapper : null
    ] }),
    !shouldLabelBeOutside ? helperWrapper : null
  ] });
});
DateInputGroup.displayName = "NextUI.DateInputGroup";

export {
  DateInputGroup
};
