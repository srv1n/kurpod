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

interface TableColumnHeaderProps<T = object> extends HTMLNextUIProps<"th"> {
    slots: ValuesType["slots"];
    state: ValuesType["state"];
    classNames?: ValuesType["classNames"];
    /**
     * The table node to render.
     */
    node: GridNode<T>;
}
declare const TableColumnHeader: _nextui_org_system.InternalForwardRefRenderFunction<"th", TableColumnHeaderProps<object>, never>;

export { TableColumnHeaderProps, TableColumnHeader as default };
