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

// src/table-cell.tsx
var table_cell_exports = {};
__export(table_cell_exports, {
  default: () => table_cell_default
});
module.exports = __toCommonJS(table_cell_exports);
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_table = require("@react-aria/table");
var import_utils = require("@react-aria/utils");
var import_focus = require("@react-aria/focus");
var import_jsx_runtime = require("react/jsx-runtime");
var TableCell = (0, import_system.forwardRef)((props, ref) => {
  var _a, _b, _c;
  const { as, className, node, rowKey, slots, state, classNames, ...otherProps } = props;
  const Component = as || "td";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { gridCellProps } = (0, import_table.useTableCell)({ node }, state, domRef);
  const tdStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.td, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = (0, import_focus.useFocusRing)();
  const isRowSelected = state.selectionManager.isSelected(rowKey);
  const cell = (0, import_react.useMemo)(() => {
    const cellType = typeof node.rendered;
    return cellType !== "object" && cellType !== "function" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: node.rendered }) : node.rendered;
  }, [node.rendered]);
  const columnProps = ((_b = node.column) == null ? void 0 : _b.props) || {};
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
      className: (_c = slots.td) == null ? void 0 : _c.call(slots, { align: columnProps.align, class: tdStyles }),
      children: cell
    }
  );
});
TableCell.displayName = "NextUI.TableCell";
var table_cell_default = TableCell;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
