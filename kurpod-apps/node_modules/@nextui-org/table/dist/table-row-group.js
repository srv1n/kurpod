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

// src/table-row-group.tsx
var table_row_group_exports = {};
__export(table_row_group_exports, {
  default: () => table_row_group_default
});
module.exports = __toCommonJS(table_row_group_exports);
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_table = require("@react-aria/table");
var import_utils = require("@react-aria/utils");
var import_jsx_runtime = require("react/jsx-runtime");
var TableRowGroup = (0, import_system.forwardRef)((props, ref) => {
  var _a;
  const { as, className, children, slots, classNames, ...otherProps } = props;
  const Component = as || "thead";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { rowGroupProps } = (0, import_table.useTableRowGroup)();
  const theadStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.thead, className);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref: domRef,
      className: (_a = slots.thead) == null ? void 0 : _a.call(slots, { class: theadStyles }),
      ...(0, import_utils.mergeProps)(rowGroupProps, otherProps),
      children
    }
  );
});
TableRowGroup.displayName = "NextUI.TableRowGroup";
var table_row_group_default = TableRowGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
