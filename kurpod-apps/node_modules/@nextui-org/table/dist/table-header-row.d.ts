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

interface TableHeaderRowProps<T = object> extends HTMLNextUIProps<"tr"> {
    /**
     * The table node to render.
     */
    node: GridNode<T>;
    slots: ValuesType["slots"];
    state: ValuesType["state"];
    classNames?: ValuesType["classNames"];
}
declare const TableHeaderRow: _nextui_org_system.InternalForwardRefRenderFunction<"tr", TableHeaderRowProps<object>, never>;

export { TableHeaderRowProps, TableHeaderRow as default };
