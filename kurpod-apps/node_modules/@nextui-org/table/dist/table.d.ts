import * as _nextui_org_system from '@nextui-org/system';
import { UseTableProps } from './use-table.js';
import '@react-types/table';
import 'react';
import '@nextui-org/theme';
import '@react-stately/virtualizer';
import '@react-types/shared';
import '@react-stately/table';
import '@react-aria/table';
import '@nextui-org/react-utils';
import '@nextui-org/checkbox';

interface TableProps extends Omit<UseTableProps, "isSelectable" | "isMultiSelectable"> {
}
declare const Table: _nextui_org_system.InternalForwardRefRenderFunction<"table", TableProps, never>;

export { TableProps, Table as default };
