import { HTMLNextUIProps } from '@nextui-org/system';
import { CellProps } from '@react-types/table';

type TableCellProps = CellProps & HTMLNextUIProps<"td">;
declare const TableCell: (props: TableCellProps) => JSX.Element;

export { TableCellProps, TableCell as default };
