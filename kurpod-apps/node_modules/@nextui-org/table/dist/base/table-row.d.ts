import { HTMLNextUIProps } from '@nextui-org/system';
import { RowProps } from '@react-types/table';

type TableRowProps<T = object> = RowProps<T> & Omit<HTMLNextUIProps<"tr">, keyof RowProps<T>>;
declare const TableRow: (props: TableRowProps) => JSX.Element;

export { TableRowProps, TableRow as default };
