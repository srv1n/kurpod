import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { getAttributes, isStructTreeNode, isStructTreeNodeWithOnlyContentChild, } from './shared/structTreeUtils.js';
export default function StructTreeItem({ className, node, }) {
    const attributes = useMemo(() => getAttributes(node), [node]);
    const children = useMemo(() => {
        if (!isStructTreeNode(node)) {
            return null;
        }
        if (isStructTreeNodeWithOnlyContentChild(node)) {
            return null;
        }
        return node.children.map((child, index) => {
            return (
            // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
            _jsx(StructTreeItem, { node: child }, index));
        });
    }, [node]);
    return (_jsx("span", Object.assign({ className: className }, attributes, { children: children })));
}
