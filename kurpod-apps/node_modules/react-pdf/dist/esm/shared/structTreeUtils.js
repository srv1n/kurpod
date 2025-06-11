import { HEADING_PATTERN, PDF_ROLE_TO_HTML_ROLE } from './constants.js';
export function isPdfRole(role) {
    return role in PDF_ROLE_TO_HTML_ROLE;
}
export function isStructTreeNode(node) {
    return 'children' in node;
}
export function isStructTreeNodeWithOnlyContentChild(node) {
    if (!isStructTreeNode(node)) {
        return false;
    }
    return node.children.length === 1 && 0 in node.children && 'id' in node.children[0];
}
export function getRoleAttributes(node) {
    const attributes = {};
    if (isStructTreeNode(node)) {
        const { role } = node;
        const matches = role.match(HEADING_PATTERN);
        if (matches) {
            attributes.role = 'heading';
            attributes['aria-level'] = Number(matches[1]);
        }
        else if (isPdfRole(role)) {
            const htmlRole = PDF_ROLE_TO_HTML_ROLE[role];
            if (htmlRole) {
                attributes.role = htmlRole;
            }
        }
    }
    return attributes;
}
export function getBaseAttributes(node) {
    const attributes = {};
    if (isStructTreeNode(node)) {
        if (node.alt !== undefined) {
            attributes['aria-label'] = node.alt;
        }
        if (node.lang !== undefined) {
            attributes.lang = node.lang;
        }
        if (isStructTreeNodeWithOnlyContentChild(node)) {
            const [child] = node.children;
            if (child) {
                const childAttributes = getBaseAttributes(child);
                return Object.assign(Object.assign({}, attributes), childAttributes);
            }
        }
    }
    else {
        if ('id' in node) {
            attributes['aria-owns'] = node.id;
        }
    }
    return attributes;
}
export function getAttributes(node) {
    if (!node) {
        return null;
    }
    return Object.assign(Object.assign({}, getRoleAttributes(node)), getBaseAttributes(node));
}
