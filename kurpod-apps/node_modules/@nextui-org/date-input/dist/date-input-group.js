"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/date-input-group.tsx
var date_input_group_exports = {};
__export(date_input_group_exports, {
  DateInputGroup: () => DateInputGroup
});
module.exports = __toCommonJS(date_input_group_exports);
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_jsx_runtime = require("react/jsx-runtime");
var DateInputGroup = (0, import_system.forwardRef)((props, ref) => {
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
  const labelContent = label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...labelProps, children: label }) : null;
  const errorMessage = typeof errorMessageProp === "function" ? errorMessageProp({
    isInvalid,
    validationErrors,
    validationDetails
  }) : errorMessageProp || (validationErrors == null ? void 0 : validationErrors.join(" "));
  const hasHelper = !!description || !!errorMessage;
  const helperWrapper = (0, import_react.useMemo)(() => {
    if (!hasHelper)
      return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...helperWrapperProps, children: isInvalid && errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...errorMessageProps, children: errorMessage }) : description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...descriptionProps, children: description }) : null });
  }, [
    hasHelper,
    errorMessage,
    description,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...otherProps, ref, "data-has-helper": (0, import_shared_utils.dataAttr)(hasHelper), children: [
    shouldLabelBeOutside ? labelContent : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...groupProps, children: [
      !shouldLabelBeOutside ? labelContent : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...wrapperProps, children: [
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateInputGroup
});
