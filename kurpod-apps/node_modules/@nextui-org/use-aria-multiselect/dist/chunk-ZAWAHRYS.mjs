// src/use-multiselect.ts
import { useCollator } from "@react-aria/i18n";
import { setInteractionModality } from "@react-aria/interactions";
import { useField } from "@react-aria/label";
import { useMenuTrigger } from "@react-aria/menu";
import { ListKeyboardDelegate, useTypeSelect } from "@react-aria/selection";
import { chain, filterDOMProps, mergeProps, useId } from "@react-aria/utils";
import { useMemo } from "react";
function useMultiSelect(props, state, ref) {
  const { disallowEmptySelection, isDisabled } = props;
  const collator = useCollator({ usage: "search", sensitivity: "base" });
  const delegate = useMemo(
    () => new ListKeyboardDelegate(state.collection, state.disabledKeys, null, collator),
    [state.collection, state.disabledKeys, collator]
  );
  const { menuTriggerProps, menuProps } = useMenuTrigger(
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
  const { typeSelectProps } = useTypeSelect({
    keyboardDelegate: delegate,
    selectionManager: state.selectionManager,
    onTypeSelect(key) {
      state.setSelectedKeys([key]);
    }
  });
  const { isInvalid, validationErrors, validationDetails } = state.displayValidation;
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    ...props,
    labelElementType: "span",
    isInvalid,
    errorMessage: props.errorMessage || validationErrors
  });
  typeSelectProps.onKeyDown = typeSelectProps.onKeyDownCapture;
  delete typeSelectProps.onKeyDownCapture;
  const domProps = filterDOMProps(props, { labelable: true });
  const triggerProps = mergeProps(typeSelectProps, menuTriggerProps, fieldProps);
  const valueId = useId();
  return {
    labelProps: {
      ...labelProps,
      onClick: () => {
        var _a;
        if (!props.isDisabled) {
          (_a = ref.current) == null ? void 0 : _a.focus();
          setInteractionModality("keyboard");
        }
      }
    },
    triggerProps: mergeProps(domProps, {
      ...triggerProps,
      onKeyDown: chain(triggerProps.onKeyDown, triggerOnKeyDown, props.onKeyDown),
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

export {
  useMultiSelect
};
