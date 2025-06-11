"use client";
import {
  useBreadcrumbs
} from "./chunk-AAD6P2XK.mjs";

// src/breadcrumbs.tsx
import { cloneElement, useMemo } from "react";
import { forwardRef } from "@nextui-org/system";
import { ChevronRightIcon, EllipsisIcon } from "@nextui-org/shared-icons";
import { warn } from "@nextui-org/shared-utils";
import { chain } from "@react-aria/utils";
import { jsx } from "react/jsx-runtime";
var Breadcrumbs = forwardRef((props, ref) => {
  const {
    Component,
    children,
    childCount,
    itemProps,
    separator = /* @__PURE__ */ jsx(ChevronRightIcon, {}),
    maxItems,
    itemsBeforeCollapse,
    itemsAfterCollapse,
    isDisabled,
    renderEllipsis,
    getBaseProps,
    getListProps,
    getEllipsisProps,
    getSeparatorProps,
    onAction
  } = useBreadcrumbs({
    ...props,
    ref
  });
  const content = useMemo(() => {
    let items = children == null ? void 0 : children.map((child, i) => {
      var _a;
      const isLast = i === childCount - 1;
      const itemKey = (child == null ? void 0 : child.key) || i;
      return cloneElement(child, {
        ...itemProps,
        isLast,
        separator,
        isDisabled: isDisabled && !isLast,
        isCurrent: isLast || child.props.isCurrent,
        ...child.props,
        key: itemKey,
        onPress: chain((_a = child.props) == null ? void 0 : _a.onPress, () => onAction == null ? void 0 : onAction(itemKey))
      });
    });
    if (!items)
      return null;
    if (childCount < maxItems) {
      return items;
    }
    if (itemsBeforeCollapse + itemsAfterCollapse >= childCount) {
      warn(
        `You have provided an invalid combination of props to the Breadcrumbs. itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= itemsCount={${childCount}}`,
        "Breadcrumbs"
      );
      return items;
    }
    const itemsInEllipsis = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);
    if (itemsInEllipsis.length < 1) {
      return items;
    }
    const ellipsisIcon = /* @__PURE__ */ jsx(EllipsisIcon, { ...getEllipsisProps() });
    const collapsedItem = cloneElement(itemsInEllipsis[0], {
      ...itemsInEllipsis[0].props,
      key: "ellipsis",
      children: ellipsisIcon
    });
    const ellipsisItem = typeof renderEllipsis === "function" ? renderEllipsis({
      collapsedItem,
      items: itemsInEllipsis.map((item) => item.props),
      maxItems,
      ellipsisIcon,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      separator: /* @__PURE__ */ jsx("span", { ...getSeparatorProps(), children: separator })
    }) : collapsedItem;
    return [
      ...items.slice(0, itemsBeforeCollapse),
      ellipsisItem,
      ...items.slice(items.length - itemsAfterCollapse, items.length)
    ];
  }, [
    children,
    childCount,
    separator,
    itemProps,
    itemsBeforeCollapse,
    itemsAfterCollapse,
    isDisabled
  ]);
  return /* @__PURE__ */ jsx(Component, { ...getBaseProps(), children: /* @__PURE__ */ jsx("ol", { ...getListProps(), children: content }) });
});
Breadcrumbs.displayName = "NextUI.Breadcrumbs";
var breadcrumbs_default = Breadcrumbs;

export {
  breadcrumbs_default
};
