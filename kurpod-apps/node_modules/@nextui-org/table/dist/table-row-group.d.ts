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

interface TableRowGroupProps extends HTMLNextUIProps<"thead"> {
    slots: ValuesType["slots"];
    classNames?: ValuesType["classNames"];
}
declare const TableRowGroup: _nextui_org_system.InternalForwardRefRenderFunction<"thead", TableRowGroupProps, never>;

export { TableRowGroupProps, TableRowGroup as default };
