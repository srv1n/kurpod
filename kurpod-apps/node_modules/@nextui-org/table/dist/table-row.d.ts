import * as _nextui_org_system from '@nextui-org/system';
import { GridNode } from '@react-types/grid';
import { TableRowProps as TableRowProps$1 } from './base/table-row.js';
import { ValuesType } from './use-table.js';
import '@react-types/table';
import 'react';
import '@nextui-org/theme';
import '@react-stately/virtualizer';
import '@react-types/shared';
import '@react-stately/table';
import '@react-aria/table';
import '@nextui-org/react-utils';
import '@nextui-org/checkbox';

interface TableRowProps<T = object> extends Omit<TableRowProps$1, "children"> {
    /**
     * The table row.
     */
    node: GridNode<T>;
    slots: ValuesType["slots"];
    state: ValuesType["state"];
    isSelectable?: ValuesType["isSelectable"];
    classNames?: ValuesType["classNames"];
}
declare const TableRow: _nextui_org_system.InternalForwardRefRenderFunction<"tr", TableRowProps<object>, never>;

export { TableRowProps, TableRow as default };
