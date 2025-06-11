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

// src/use-multiselect.ts
var use_multiselect_exports = {};
__export(use_multiselect_exports, {
  useMultiSelect: () => useMultiSelect
});
module.exports = __toCommonJS(use_multiselect_exports);
var import_i18n = require("@react-aria/i18n");
var import_interactions = require("@react-aria/interactions");
var import_label = require("@react-aria/label");
var import_menu = require("@react-aria/menu");
var import_selection = require("@react-aria/selection");
var import_utils = require("@react-aria/utils");
var import_react = require("react");
function useMultiSelect(props, state, ref) {
  const { disallowEmptySelection, isDisabled } = props;
  const collator = (0, import_i18n.useCollator)({ usage: "search", sensitivity: "base" });
  const delegate = (0, import_react.useMemo)(
    () => new import_selection.ListKeyboardDelegate(state.collection, state.disabledKeys, null, collator),
    [state.collection, state.disabledKeys, collator]
  );
  const { menuTriggerProps, menuProps } = (0, import_menu.useMenuTrigger)(
    {
      isDisabled,
      type: "listbox"
    },
    state,
    ref
  );
  const triggerOnKeyDown = (e) => {
    if (state.selectionMode === "single") {
      switch (e.key) {
        case "ArrowLeft": {
          e.preventDefault();
          const key = state.selectedKeys.size > 0 ? delegate.getKeyAbove(state.selectedKeys.values().next().value) : delegate.getFirstKey();
          if (key) {
            state.setSelectedKeys([key]);
          }
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          const key = state.selectedKeys.size > 0 ? delegate.getKeyBelow(state.selectedKeys.values().next().value) : delegate.getFirstKey();
          if (key) {
            state.setSelectedKeys([key]);
          }
          break;
        }
      }
    }
  };
  const { typeSelectProps } = (0, import_selection.useTypeSelect)({
    keyboardDelegate: delegate,
    selectionManager: state.selectionManager,
    onTypeSelect(key) {
      state.setSelectedKeys([key]);
    }
  });
  const { isInvalid, validationErrors, validationDetails } = state.displayValidation;
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = (0, import_label.useField)({
    ...props,
    labelElementType: "span",
    isInvalid,
    errorMessage: props.errorMessage || validationErrors
  });
  typeSelectProps.onKeyDown = typeSelectProps.onKeyDownCapture;
  delete typeSelectProps.onKeyDownCapture;
  const domProps = (0, import_utils.filterDOMProps)(props, { labelable: true });
  const triggerProps = (0, import_utils.mergeProps)(typeSelectProps, menuTriggerProps, fieldProps);
  const valueId = (0, import_utils.useId)();
  return {
    labelProps: {
      ...labelProps,
      onClick: () => {
        var _a;
        if (!props.isDisabled) {
          (_a = ref.current) == null ? void 0 : _a.focus();
          (0, import_interactions.setInteractionModality)("keyboard");
        }
      }
    },
    triggerProps: (0, import_utils.mergeProps)(domProps, {
      ...triggerProps,
      onKeyDown: (0, import_utils.chain)(triggerProps.onKeyDown, triggerOnKeyDown, props.onKeyDown),
      onKeyUp: props.onKeyUp,
      "aria-labelledby": [
        valueId,
        domProps["aria-label"] !== void 0 ? domProps["aria-labelledby"] !== void 0 ? domProps["aria-labelledby"] : triggerProps.id : triggerProps["aria-labelledby"]
      ].join(" "),
      onFocus(e) {
        if (state.isFocused) {
          return;
        }
        if (props.onFocus) {
          props.onFocus(e);
        }
        state.setFocused(true);
      },
      onBlur(e) {
        if (state.isOpen) {
          return;
        }
        if (props.onBlur) {
          props.onBlur(e);
        }
        state.setFocused(false);
      }
    }),
    valueProps: {
      id: valueId
    },
    menuProps: {
      ...menuProps,
      disallowEmptySelection,
      autoFocus: state.focusStrategy || true,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      onBlur: (e) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
          return;
        }
        if (props.onBlur) {
          props.onBlur(e);
        }
        state.setFocused(false);
      },
      onFocus: menuProps == null ? void 0 : menuProps.onFocus,
      "aria-labelledby": [
        fieldProps["aria-labelledby"],
        triggerProps["aria-label"] && !fieldProps["aria-labelledby"] ? triggerProps.id : null
      ].filter(Boolean).join(" ")
    },
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
    validationDetails
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useMultiSelect
});
