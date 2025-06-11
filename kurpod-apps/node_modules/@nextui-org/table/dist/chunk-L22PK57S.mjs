"use client";

// src/table-row.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useTableRow } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var TableRow = forwardRef((props, ref) => {
  var _a, _b;
  const { as, className, children, node, slots, state, isSelectable, classNames, ...otherProps } = props;
  const Component = as || ((props == null ? void 0 : props.href) ? "a" : "tr");
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { rowProps } = useTableRow({ node }, state, domRef);
  const trStyles = clsx(classNames == null ? void 0 : classNames.tr, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isDisabled = state.disabledKeys.has(node.key);
  const isSelected = state.selectionManager.isSelected(node.key);
  const { isHovered, hoverProps } = useHover({ isDisabled });
  const { isFirst, isLast, isMiddle, isOdd } = useMemo(() => {
    const isFirst2 = node.key === state.collection.getFirstKey();
    const isLast2 = node.key === state.collection.getLastKey();
    const isMiddle2 = !isFirst2 && !isLast2;
    const isOdd2 = (node == null ? void 0 : node.index) ? (node.index + 1) % 2 === 0 : false;
    return {
      isFirst: isFirst2,
      isLast: isLast2,
      isMiddle: isMiddle2,
      isOdd: isOdd2
    };
  }, [node, state.collection]);
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      "data-disabled": dataAttr(isDisabled),
      "data-first": dataAttr(isFirst),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-last": dataAttr(isLast),
      "data-middle": dataAttr(isMiddle),
      "data-odd": dataAttr(isOdd),
      "data-selected": dataAttr(isSelected),
      ...mergeProps(
        rowProps,
        focusProps,
        isSelectable ? hoverProps : {},
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
TableRow.displayName = "NextUI.TableRow";
var table_row_default = TableRow;

export {
  table_row_default
};
