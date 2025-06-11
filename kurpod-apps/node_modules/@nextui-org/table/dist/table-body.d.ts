import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';
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

interface TableBodyProps extends HTMLNextUIProps<"tbody"> {
    slots: ValuesType["slots"];
    collection: ValuesType["collection"];
    state: ValuesType["state"];
    isSelectable: ValuesType["isSelectable"];
    color: ValuesType["color"];
    disableAnimation: ValuesType["disableAnimation"];
    checkboxesProps: ValuesType["checkboxesProps"];
    selectionMode: ValuesType["selectionMode"];
    classNames?: ValuesType["classNames"];
}
declare const TableBody: _nextui_org_system.InternalForwardRefRenderFunction<"tbody", TableBodyProps, never>;

export { TableBodyProps, TableBody as default };
