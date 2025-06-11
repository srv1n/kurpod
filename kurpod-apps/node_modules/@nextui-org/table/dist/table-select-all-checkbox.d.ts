import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';
import { GridNode } from '@react-types/grid';
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

interface TableSelectAllCheckboxProps<T = object> extends HTMLNextUIProps<"th"> {
    /**
     * The table column.
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
declare const TableSelectAllCheckbox: _nextui_org_system.InternalForwardRefRenderFunction<"th", TableSelectAllCheckboxProps<object>, never>;

export { TableSelectAllCheckboxProps, TableSelectAllCheckbox as default };
