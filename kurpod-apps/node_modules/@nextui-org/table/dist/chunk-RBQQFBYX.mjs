"use client";
import {
  table_cell_default
} from "./chunk-RG5TTATB.mjs";
import {
  table_checkbox_cell_default
} from "./chunk-ZVKU2CIZ.mjs";
import {
  table_row_default
} from "./chunk-L22PK57S.mjs";

// src/table-body.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useTableRowGroup } from "@react-aria/table";
import { filterDOMProps } from "@nextui-org/react-utils";
import { mergeProps } from "@react-aria/utils";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var TableBody = forwardRef((props, ref) => {
  var _a;
  const {
    as,
    className,
    slots,
    state,
    collection,
    isSelectable,
    color,
    disableAnimation,
    checkboxesProps,
    selectionMode,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "tbody";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const { rowGroupProps } = useTableRowGroup();
  const tbodyStyles = clsx(classNames == null ? void 0 : classNames.tbody, className);
  const bodyProps = collection == null ? void 0 : collection.body.props;
  const isLoading = (bodyProps == null ? void 0 : bodyProps.isLoading) || (bodyProps == null ? void 0 : bodyProps.loadingState) === "loading" || (bodyProps == null ? void 0 : bodyProps.loadingState) === "loadingMore";
  const renderRows = useMemo(() => {
    return [...collection.body.childNodes].map((row) => /* @__PURE__ */ jsx(
      table_row_default,
      {
        classNames,
        isSelectable,
        node: row,
        slots,
        state,
        children: [...row.childNodes].map(
          (cell) => cell.props.isSelectionCell ? /* @__PURE__ */ jsx(
            table_checkbox_cell_default,
            {
              checkboxesProps,
              classNames,
              color,
              disableAnimation,
              node: cell,
              rowKey: row.key,
              selectionMode,
              slots,
              state
            },
            cell.key
          ) : /* @__PURE__ */ jsx(
            table_cell_default,
            {
              classNames,
              node: cell,
              rowKey: row.key,
              slots,
              state
            },
            cell.key
          )
        )
      },
      row.key
    ));
  }, [collection.body.childNodes, classNames, isSelectable, slots, state]);
  let emptyContent;
  let loadingContent;
  if (collection.size === 0 && bodyProps.emptyContent) {
    emptyContent = /* @__PURE__ */ jsx("tr", { role: "row", children: /* @__PURE__ */ jsx(
      "td",
      {
        className: slots == null ? void 0 : slots.emptyWrapper({ class: classNames == null ? void 0 : classNames.emptyWrapper }),
        colSpan: collection.columnCount,
        role: "gridcell",
        children: !isLoading && bodyProps.emptyContent
      }
    ) });
  }
  if (isLoading && bodyProps.loadingContent) {
    loadingContent = /* @__PURE__ */ jsxs("tr", { role: "row", children: [
      /* @__PURE__ */ jsx(
        "td",
        {
          className: slots == null ? void 0 : slots.loadingWrapper({ class: classNames == null ? void 0 : classNames.loadingWrapper }),
          colSpan: collection.columnCount,
          role: "gridcell",
          children: bodyProps.loadingContent
        }
      ),
      !emptyContent && collection.size === 0 ? /* @__PURE__ */ jsx("td", { className: slots == null ? void 0 : slots.emptyWrapper({ class: classNames == null ? void 0 : classNames.emptyWrapper }) }) : null
    ] });
  }
  return /* @__PURE__ */ jsxs(
    Component,
    {
      ref: domRef,
      ...mergeProps(
        rowGroupProps,
        filterDOMProps(bodyProps, {
          enabled: shouldFilterDOMProps
        }),
        otherProps
      ),
      className: (_a = slots.tbody) == null ? void 0 : _a.call(slots, { class: tbodyStyles }),
      "data-empty": dataAttr(collection.size === 0),
      "data-loading": dataAttr(isLoading),
      children: [
        renderRows,
        loadingContent,
        emptyContent
      ]
    }
  );
});
TableBody.displayName = "NextUI.TableBody";
var table_body_default = TableBody;

export {
  table_body_default
};
