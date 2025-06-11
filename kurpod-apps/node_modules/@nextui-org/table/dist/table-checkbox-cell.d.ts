import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';
import { GridNode } from '@react-types/grid';
import { Key } from 'react';
import { ValuesType } from './use-table.js';
import '@react-types/table';
import '@nextui-org/theme';
import '@react-stately/virtualizer';
import '@react-types/shared';
import '@react-stately/table';
import '@react-aria/table';
import '@nextui-org/react-utils';
import '@nextui-org/checkbox';

interface TableCheckboxCellProps<T = object> extends HTMLNextUIProps<"td"> {
    /**
     * The key of the table row.
     */
    rowKey: Key;
    /**
     * The table cell.
     */
    node: GridNode<T>;
    slots: ValuesType["slots"];
    state: ValuesType["state"];
    color: ValuesType["color"];
    disableAnimation: ValuesType["disableAnimation"];
    checkboxesProps: ValuesType["checkboxesProps"];
    selectionMode: ValuesType["selectionMode"];
    classNames?: ValuesType["classNames"];
}
declare const TableCheckboxCell: _nextui_org_system.InternalForwardRefRenderFunction<"td", TableCheckboxCellProps<object>, never>;

export { TableCheckboxCellProps, TableCheckboxCell as default };
