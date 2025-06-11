"use client";

// src/table-header-row.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { useTableHeaderRow } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { jsx } from "react/jsx-runtime";
var TableHeaderRow = forwardRef((props, ref) => {
  var _a, _b;
  const { as, className, children, node, slots, classNames, state, ...otherProps } = props;
  const Component = as || "tr";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { rowProps } = useTableHeaderRow({ node }, state, domRef);
  const trStyles = clsx(classNames == null ? void 0 : classNames.tr, className, (_a = node.props) == null ? void 0 : _a.className);
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      ...mergeProps(
        rowProps,
        filterDOMProps(node.props, {
          enabled: shouldFilterDOMProps
        }),
        otherProps
      ),
      className: (_b = slots.tr) == null ? void 0 : _b.call(slots, { class: trStyles }),
      children
    }
  );
});
TableHeaderRow.displayName = "NextUI.TableHeaderRow";
var table_header_row_default = TableHeaderRow;

export {
  table_header_row_default
};
