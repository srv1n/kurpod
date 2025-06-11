"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/table-body.tsx
var table_body_exports = {};
__export(table_body_exports, {
  default: () => table_body_default
});
module.exports = __toCommonJS(table_body_exports);
var import_system4 = require("@nextui-org/system");
var import_react_utils4 = require("@nextui-org/react-utils");
var import_shared_utils4 = require("@nextui-org/shared-utils");
var import_table4 = require("@react-aria/table");
var import_react_utils5 = require("@nextui-org/react-utils");
var import_utils4 = require("@react-aria/utils");
var import_react3 = require("react");

// src/table-row.tsx
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_table = require("@react-aria/table");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_interactions = require("@react-aria/interactions");
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var TableRow = (0, import_system.forwardRef)((props, ref) => {
  var _a, _b;
  const { as, className, children, node, slots, state, isSelectable, classNames, ...otherProps } = props;
  const Component = as || ((props == null ? void 0 : props.href) ? "a" : "tr");
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { rowProps } = (0, import_table.useTableRow)({ node }, state, domRef);
  const trStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.tr, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = (0, import_focus.useFocusRing)();
  const isDisabled = state.disabledKeys.has(node.key);
  const isSelected = state.selectionManager.isSelected(node.key);
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  const { isFirst, isLast, isMiddle, isOdd } = (0, import_react.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref: domRef,
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-first": (0, import_shared_utils.dataAttr)(isFirst),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-last": (0, import_shared_utils.dataAttr)(isLast),
      "data-middle": (0, import_shared_utils.dataAttr)(isMiddle),
      "data-odd": (0, import_shared_utils.dataAttr)(isOdd),
      "data-selected": (0, import_shared_utils.dataAttr)(isSelected),
      ...(0, import_utils.mergeProps)(
        rowProps,
        focusProps,
        isSelectable ? hoverProps : {},
        (0, import_react_utils.filterDOMProps)(node.props, {
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

// src/table-cell.tsx
var import_react2 = require("react");
var import_system2 = require("@nextui-org/system");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var import_table2 = require("@react-aria/table");
var import_utils2 = require("@react-aria/utils");
var import_focus2 = require("@react-aria/focus");
var import_jsx_runtime2 = require("react/jsx-runtime");
var TableCell = (0, import_system2.forwardRef)((props, ref) => {
  var _a, _b, _c;
  const { as, className, node, rowKey, slots, state, classNames, ...otherProps } = props;
  const Component = as || "td";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const { gridCellProps } = (0, import_table2.useTableCell)({ node }, state, domRef);
  const tdStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.td, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = (0, import_focus2.useFocusRing)();
  const isRowSelected = state.selectionManager.isSelected(rowKey);
  const cell = (0, import_react2.useMemo)(() => {
    const cellType = typeof node.rendered;
    return cellType !== "object" && cellType !== "function" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: node.rendered }) : node.rendered;
  }, [node.rendered]);
  const columnProps = ((_b = node.column) == null ? void 0 : _b.props) || {};
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    Component,
    {
      ref: domRef,
      "data-focus-visible": (0, import_shared_utils2.dataAttr)(isFocusVisible),
      "data-selected": (0, import_shared_utils2.dataAttr)(isRowSelected),
      ...(0, import_utils2.mergeProps)(
        gridCellProps,
        focusProps,
        (0, import_react_utils2.filterDOMProps)(node.props, {
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

// src/table-checkbox-cell.tsx
var import_system3 = require("@nextui-org/system");
var import_react_utils3 = require("@nextui-org/react-utils");
var import_shared_utils3 = require("@nextui-org/shared-utils");
var import_table3 = require("@react-aria/table");
var import_utils3 = require("@react-aria/utils");
var import_focus3 = require("@react-aria/focus");
var import_checkbox = require("@nextui-org/checkbox");
var import_visually_hidden = require("@react-aria/visually-hidden");
var import_jsx_runtime3 = require("react/jsx-runtime");
var TableCheckboxCell = (0, import_system3.forwardRef)((props, ref) => {
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
  const domRef = (0, import_react_utils3.useDOMRef)(ref);
  const { gridCellProps } = (0, import_table3.useTableCell)({ node }, state, domRef);
  const { isFocusVisible, focusProps } = (0, import_focus3.useFocusRing)();
  const { checkboxProps } = (0, import_table3.useTableSelectionCheckbox)({ key: (node == null ? void 0 : node.parentKey) || node.key }, state);
  const tdStyles = (0, import_shared_utils3.clsx)(classNames == null ? void 0 : classNames.td, className, (_a = node.props) == null ? void 0 : _a.className);
  const isSingleSelectionMode = selectionMode === "single";
  const { onChange, ...otherCheckboxProps } = checkboxProps;
  const isRowSelected = state.selectionManager.isSelected(rowKey);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    Component,
    {
      ref: domRef,
      "data-focus-visible": (0, import_shared_utils3.dataAttr)(isFocusVisible),
      "data-selected": (0, import_shared_utils3.dataAttr)(isRowSelected),
      ...(0, import_utils3.mergeProps)(
        gridCellProps,
        focusProps,
        (0, import_react_utils3.filterDOMProps)(node.props, {
          enabled: shouldFilterDOMProps
        }),
        otherProps
      ),
      className: (_b = slots.td) == null ? void 0 : _b.call(slots, { class: tdStyles }),
      children: isSingleSelectionMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_visually_hidden.VisuallyHidden, { children: checkboxProps["aria-label"] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_checkbox.Checkbox,
        {
          color,
          disableAnimation,
          onValueChange: onChange,
          ...(0, import_utils3.mergeProps)(checkboxesProps, otherCheckboxProps)
        }
      )
    }
  );
});
TableCheckboxCell.displayName = "NextUI.TableCheckboxCell";
var table_checkbox_cell_default = TableCheckboxCell;

// src/table-body.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var TableBody = (0, import_system4.forwardRef)((props, ref) => {
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
  const domRef = (0, import_react_utils4.useDOMRef)(ref);
  const { rowGroupProps } = (0, import_table4.useTableRowGroup)();
  const tbodyStyles = (0, import_shared_utils4.clsx)(classNames == null ? void 0 : classNames.tbody, className);
  const bodyProps = collection == null ? void 0 : collection.body.props;
  const isLoading = (bodyProps == null ? void 0 : bodyProps.isLoading) || (bodyProps == null ? void 0 : bodyProps.loadingState) === "loading" || (bodyProps == null ? void 0 : bodyProps.loadingState) === "loadingMore";
  const renderRows = (0, import_react3.useMemo)(() => {
    return [...collection.body.childNodes].map((row) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      table_row_default,
      {
        classNames,
        isSelectable,
        node: row,
        slots,
        state,
        children: [...row.childNodes].map(
          (cell) => cell.props.isSelectionCell ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
          ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    emptyContent = /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("tr", { role: "row", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    loadingContent = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("tr", { role: "row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "td",
        {
          className: slots == null ? void 0 : slots.loadingWrapper({ class: classNames == null ? void 0 : classNames.loadingWrapper }),
          colSpan: collection.columnCount,
          role: "gridcell",
          children: bodyProps.loadingContent
        }
      ),
      !emptyContent && collection.size === 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("td", { className: slots == null ? void 0 : slots.emptyWrapper({ class: classNames == null ? void 0 : classNames.emptyWrapper }) }) : null
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    Component,
    {
      ref: domRef,
      ...(0, import_utils4.mergeProps)(
        rowGroupProps,
        (0, import_react_utils5.filterDOMProps)(bodyProps, {
          enabled: shouldFilterDOMProps
        }),
        otherProps
      ),
      className: (_a = slots.tbody) == null ? void 0 : _a.call(slots, { class: tbodyStyles }),
      "data-empty": (0, import_shared_utils4.dataAttr)(collection.size === 0),
      "data-loading": (0, import_shared_utils4.dataAttr)(isLoading),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
