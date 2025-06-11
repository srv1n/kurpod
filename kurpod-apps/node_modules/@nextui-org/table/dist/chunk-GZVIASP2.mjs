"use client";

// src/table-row-group.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { useTableRowGroup } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { jsx } from "react/jsx-runtime";
var TableRowGroup = forwardRef((props, ref) => {
  var _a;
  const { as, className, children, slots, classNames, ...otherProps } = props;
  const Component = as || "thead";
  const domRef = useDOMRef(ref);
  const { rowGroupProps } = useTableRowGroup();
  const theadStyles = clsx(classNames == null ? void 0 : classNames.thead, className);
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      className: (_a = slots.thead) == null ? void 0 : _a.call(slots, { class: theadStyles }),
      ...mergeProps(rowGroupProps, otherProps),
      children
    }
  );
});
TableRowGroup.displayName = "NextUI.TableRowGroup";
var table_row_group_default = TableRowGroup;

export {
  table_row_group_default
};
