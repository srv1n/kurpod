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

// src/base-form.tsx
var base_form_exports = {};
__export(base_form_exports, {
  Form: () => Form,
  FormContext: () => FormContext
});
module.exports = __toCommonJS(base_form_exports);
var import_form = require("@react-stately/form");
var import_react2 = require("react");
var import_theme = require("@nextui-org/theme");

// src/utils.ts
var import_react = require("react");
var import_utils = require("@react-aria/utils");
var DEFAULT_SLOT = Symbol("default");
function useSlottedContext(context, slot) {
  let ctx = (0, import_react.useContext)(context);
  if (slot === null) {
    return null;
  }
  if (ctx && typeof ctx === "object" && "slots" in ctx && ctx.slots) {
    let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map((p) => `"${p}"`));
    if (!slot && !ctx.slots[DEFAULT_SLOT]) {
      throw new Error(`A slot prop is required. Valid slot names are ${availableSlots}.`);
    }
    let slotKey = slot || DEFAULT_SLOT;
    if (!ctx.slots[slotKey]) {
      throw new Error(`Invalid slot "${slot}". Valid slot names are ${availableSlots}.`);
    }
    return ctx.slots[slotKey];
  }
  return ctx;
}
function useContextProps(props, ref, context) {
  let ctx = useSlottedContext(context, props.slot) || {};
  let { ref: contextRef, ...contextProps } = ctx;
  let mergedRef = (0, import_utils.useObjectRef)((0, import_react.useMemo)(() => (0, import_utils.mergeRefs)(ref, contextRef), [ref, contextRef]));
  let mergedProps = (0, import_utils.mergeProps)(contextProps, props);
  if ("style" in contextProps && contextProps.style && "style" in props && props.style) {
    if (typeof contextProps.style === "function" || typeof props.style === "function") {
      mergedProps.style = (renderProps) => {
        let contextStyle = typeof contextProps.style === "function" ? contextProps.style(renderProps) : contextProps.style;
        let defaultStyle = { ...renderProps.defaultStyle, ...contextStyle };
        let style = typeof props.style === "function" ? props.style({ ...renderProps, defaultStyle }) : props.style;
        return { ...defaultStyle, ...style };
      };
    } else {
      mergedProps.style = { ...contextProps.style, ...props.style };
    }
  }
  return [mergedProps, mergedRef];
}

// src/base-form.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var FormContext = (0, import_react2.createContext)(null);
var Form = (0, import_react2.forwardRef)(function Form2(props, ref) {
  [props, ref] = useContextProps(props, ref, FormContext);
  let { validationErrors, validationBehavior = "native", children, className, ...domProps } = props;
  const styles = (0, import_react2.useMemo)(() => (0, import_theme.form)({ className }), [className]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", { noValidate: validationBehavior !== "native", ...domProps, ref, className: styles, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContext.Provider, { value: { ...props, validationBehavior }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_form.FormValidationContext.Provider, { value: validationErrors != null ? validationErrors : {}, children }) }) });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Form,
  FormContext
});
