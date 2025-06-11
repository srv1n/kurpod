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

// src/table-column-header.tsx
var table_column_header_exports = {};
__export(table_column_header_exports, {
  default: () => table_column_header_default
});
module.exports = __toCommonJS(table_column_header_exports);
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_table = require("@react-aria/table");
var import_utils = require("@react-aria/utils");
var import_shared_icons = require("@nextui-org/shared-icons");
var import_focus = require("@react-aria/focus");
var import_visually_hidden = require("@react-aria/visually-hidden");
var import_interactions = require("@react-aria/interactions");
var import_jsx_runtime = require("react/jsx-runtime");
var TableColumnHeader = (0, import_system.forwardRef)((props, ref) => {
  var _a, _b, _c, _d, _e;
  const { as, className, state, node, slots, classNames, ...otherProps } = props;
  const Component = as || "th";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { columnHeaderProps } = (0, import_table.useTableColumnHeader)({ node }, state, domRef);
  const thStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.th, className, (_a = node.props) == null ? void 0 : _a.className);
  const { isFocusVisible, focusProps } = (0, import_focus.useFocusRing)();
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({});
  const { hideHeader, align, ...columnProps } = node.props;
  const allowsSorting = columnProps.allowsSorting;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    Component,
    {
      ref: domRef,
      colSpan: node.colspan,
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-sortable": (0, import_shared_utils.dataAttr)(allowsSorting),
      ...(0, import_utils.mergeProps)(
        columnHeaderProps,
        focusProps,
        (0, import_react_utils.filterDOMProps)(columnProps, {
          enabled: shouldFilterDOMProps
        }),
        allowsSorting ? hoverProps : {},
        otherProps
      ),
      className: (_b = slots.th) == null ? void 0 : _b.call(slots, { align, class: thStyles }),
      children: [
        hideHeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_visually_hidden.VisuallyHidden, { children: node.rendered }) : node.rendered,
        allowsSorting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_shared_icons.ChevronDownIcon,
          {
            "aria-hidden": "true",
            className: (_c = slots.sortIcon) == null ? void 0 : _c.call(slots, { class: classNames == null ? void 0 : classNames.sortIcon }),
            "data-direction": (_d = state.sortDescriptor) == null ? void 0 : _d.direction,
            "data-visible": (0, import_shared_utils.dataAttr)(((_e = state.sortDescriptor) == null ? void 0 : _e.column) === node.key),
            strokeWidth: 3
          }
        )
      ]
    }
  );
});
TableColumnHeader.displayName = "NextUI.TableColumnHeader";
var table_column_header_default = TableColumnHeader;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
