"use client";

// src/table-column-header.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useTableColumnHeader } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { ChevronDownIcon } from "@nextui-org/shared-icons";
import { useFocusRing } from "@react-aria/focus";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useHover } from "@react-aria/interactions";
import { jsx, jsxs } from "react/jsx-runtime";
var TableColumnHeader = forwardRef((props, ref) => {
  var _a, _b, _c, _d, _e;
  const { as, className, state, node, slots, classNames, ...otherProps } = props;
  const Component = as || "th";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { columnHeaderProps } = useTableColumnHeader({ node }, state, domRef);
  const thStyles = clsx(classNames == null ? void 0 : classNames.th, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({});
  const { hideHeader, align, ...columnProps } = node.props;
  const allowsSorting = columnProps.allowsSorting;
  return /* @__PURE__ */ jsxs(
    Component,
    {
      ref: domRef,
      colSpan: node.colspan,
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-sortable": dataAttr(allowsSorting),
      ...mergeProps(
        columnHeaderProps,
        focusProps,
        filterDOMProps(columnProps, {
          enabled: shouldFilterDOMProps
        }),
        allowsSorting ? hoverProps : {},
        otherProps
      ),
      className: (_b = slots.th) == null ? void 0 : _b.call(slots, { align, class: thStyles }),
      children: [
        hideHeader ? /* @__PURE__ */ jsx(VisuallyHidden, { children: node.rendered }) : node.rendered,
        allowsSorting && /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            "aria-hidden": "true",
            className: (_c = slots.sortIcon) == null ? void 0 : _c.call(slots, { class: classNames == null ? void 0 : classNames.sortIcon }),
            "data-direction": (_d = state.sortDescriptor) == null ? void 0 : _d.direction,
            "data-visible": dataAttr(((_e = state.sortDescriptor) == null ? void 0 : _e.column) === node.key),
            strokeWidth: 3
          }
        )
      ]
    }
  );
});
TableColumnHeader.displayName = "NextUI.TableColumnHeader";
var table_column_header_default = TableColumnHeader;

export {
  table_column_header_default
};
