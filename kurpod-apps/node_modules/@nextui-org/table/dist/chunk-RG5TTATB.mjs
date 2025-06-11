"use client";

// src/table-cell.tsx
import { useMemo } from "react";
import { forwardRef } from "@nextui-org/system";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useTableCell } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { jsx } from "react/jsx-runtime";
var TableCell = forwardRef((props, ref) => {
  var _a, _b, _c;
  const { as, className, node, rowKey, slots, state, classNames, ...otherProps } = props;
  const Component = as || "td";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { gridCellProps } = useTableCell({ node }, state, domRef);
  const tdStyles = clsx(classNames == null ? void 0 : classNames.td, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isRowSelected = state.selectionManager.isSelected(rowKey);
  const cell = useMemo(() => {
    const cellType = typeof node.rendered;
    return cellType !== "object" && cellType !== "function" ? /* @__PURE__ */ jsx("span", { children: node.rendered }) : node.rendered;
  }, [node.rendered]);
  const columnProps = ((_b = node.column) == null ? void 0 : _b.props) || {};
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
      className: (_c = slots.td) == null ? void 0 : _c.call(slots, { align: columnProps.align, class: tdStyles }),
      children: cell
    }
  );
});
TableCell.displayName = "NextUI.TableCell";
var table_cell_default = TableCell;

export {
  table_cell_default
};
