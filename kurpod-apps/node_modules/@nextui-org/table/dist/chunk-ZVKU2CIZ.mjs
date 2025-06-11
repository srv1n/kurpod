"use client";

// src/table-checkbox-cell.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useTableCell, useTableSelectionCheckbox } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { Checkbox } from "@nextui-org/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { jsx } from "react/jsx-runtime";
var TableCheckboxCell = forwardRef((props, ref) => {
  var _a, _b;
  const {
    as,
    className,
    node,
    rowKey,
    slots,
    state,
    color,
    disableAnimation,
    checkboxesProps,
    selectionMode,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "td";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { gridCellProps } = useTableCell({ node }, state, domRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { checkboxProps } = useTableSelectionCheckbox({ key: (node == null ? void 0 : node.parentKey) || node.key }, state);
  const tdStyles = clsx(classNames == null ? void 0 : classNames.td, className, (_a = node.props) == null ? void 0 : _a.className);
  const isSingleSelectionMode = selectionMode === "single";
  const { onChange, ...otherCheckboxProps } = checkboxProps;
  const isRowSelected = state.selectionManager.isSelected(rowKey);
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-selected": dataAttr(isRowSelected),
      ...mergeProps(
        gridCellProps,
        focusProps,
        filterDOMProps(node.props, {
          enabled: shouldFilterDOMProps
        }),
        otherProps
      ),
      className: (_b = slots.td) == null ? void 0 : _b.call(slots, { class: tdStyles }),
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
TableCheckboxCell.displayName = "NextUI.TableCheckboxCell";
var table_checkbox_cell_default = TableCheckboxCell;

export {
  table_checkbox_cell_default
};
