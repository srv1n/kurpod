"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StructTreeItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const structTreeUtils_js_1 = require("./shared/structTreeUtils.js");
function StructTreeItem({ className, node, }) {
    const attributes = (0, react_1.useMemo)(() => (0, structTreeUtils_js_1.getAttributes)(node), [node]);
    const children = (0, react_1.useMemo)(() => {
        if (!(0, structTreeUtils_js_1.isStructTreeNode)(node)) {
            return null;
        }
        if ((0, structTreeUtils_js_1.isStructTreeNodeWithOnlyContentChild)(node)) {
            return null;
        }
        return node.children.map((child, index) => {
            return (
            // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
            (0, jsx_runtime_1.jsx)(StructTreeItem, { node: child }, index));
        });
    }, [node]);
    return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: className }, attributes, { children: children })));
}
