"use client";

// src/table-select-all-checkbox.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useTableColumnHeader, useTableSelectAllCheckbox } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { Checkbox } from "@nextui-org/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { jsx } from "react/jsx-runtime";
var TableSelectAllCheckbox = forwardRef((props, ref) => {
  var _a, _b;
  const {
    as,
    className,
    node,
    slots,
    state,
    selectionMode,
    color,
    checkboxesProps,
    disableAnimation,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "th";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { columnHeaderProps } = useTableColumnHeader({ node }, state, domRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { checkboxProps } = useTableSelectAllCheckbox(state);
  const thStyles = clsx(classNames == null ? void 0 : classNames.th, className, (_a = node.props) == null ? void 0 : _a.className);
  const isSingleSelectionMode = selectionMode === "single";
  const { onChange, ...otherCheckboxProps } = checkboxProps;
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(
        columnHeaderProps,
        focusProps,
        filterDOMProps(node.props, {
          enabled: shouldFilterDOMProps
        }),
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        })
      ),
      className: (_b = slots.th) == null ? void 0 : _b.call(slots, { class: thStyles }),
      children: isSingleSelectionMode ? /* @__PURE__ */ jsx(VisuallyHidden, { children: checkboxProps["aria-label"] }) : /* @__PURE__ */ jsx(
        Checkbox,
        {
          color,
          disableAnimation,
          onValueChange: onChange,
          ...mergeProps(checkboxesProps, otherCheckboxProps)
        }
      )
    }
  );
});
TableSelectAllCheckbox.displayName = "NextUI.TableSelectAllCheckbox";
var table_select_all_checkbox_default = TableSelectAllCheckbox;

export {
  table_select_all_checkbox_default
};
