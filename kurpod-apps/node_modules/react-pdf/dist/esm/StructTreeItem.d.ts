import type { StructTreeContent } from 'pdfjs-dist/types/src/display/api.js';
import type { StructTreeNodeWithExtraAttributes } from './shared/types.js';
type StructTreeItemProps = {
    className?: string;
    node: StructTreeNodeWithExtraAttributes | StructTreeContent;
};
export default function StructTreeItem({ className, node, }: StructTreeItemProps): React.ReactElement;
export {};
