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

// src/table-checkbox-cell.tsx
var table_checkbox_cell_exports = {};
__export(table_checkbox_cell_exports, {
  default: () => table_checkbox_cell_default
});
module.exports = __toCommonJS(table_checkbox_cell_exports);
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_table = require("@react-aria/table");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_checkbox = require("@nextui-org/checkbox");
var import_visually_hidden = require("@react-aria/visually-hidden");
var import_jsx_runtime = require("react/jsx-runtime");
var TableCheckboxCell = (0, import_system.forwardRef)((props, ref) => {
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
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { gridCellProps } = (0, import_table.useTableCell)({ node }, state, domRef);
  const { isFocusVisible, focusProps } = (0, import_focus.useFocusRing)();
  const { checkboxProps } = (0, import_table.useTableSelectionCheckbox)({ key: (node == null ? void 0 : node.parentKey) || node.key }, state);
  const tdStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.td, className, (_a = node.props) == null ? void 0 : _a.className);
  const isSingleSelectionMode = selectionMode === "single";
  const { onChange, ...otherCheckboxProps } = checkboxProps;
  const isRowSelected = state.selectionManager.isSelected(rowKey);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref: domRef,
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-selected": (0, import_shared_utils.dataAttr)(isRowSelected),
      ...(0, import_utils.mergeProps)(
        gridCellProps,
        focusProps,
        (0, import_react_utils.filterDOMProps)(node.props, {
          enabled: shouldFilterDOMProps
        }),
        otherProps
      ),
      className: (_b = slots.td) == null ? void 0 : _b.call(slots, { class: tdStyles }),
      children: isSingleSelectionMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_visually_hidden.VisuallyHidden, { children: checkboxProps["aria-label"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_checkbox.Checkbox,
        {
          color,
          disableAnimation,
          onValueChange: onChange,
          ...(0, import_utils.mergeProps)(checkboxesProps, otherCheckboxProps)
        }
      )
    }
  );
});
TableCheckboxCell.displayName = "NextUI.TableCheckboxCell";
var table_checkbox_cell_default = TableCheckboxCell;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
