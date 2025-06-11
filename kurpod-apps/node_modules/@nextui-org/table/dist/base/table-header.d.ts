import { HTMLNextUIProps } from '@nextui-org/system';
import { TableHeaderProps as TableHeaderProps$1 } from '@react-types/table';

type TableHeaderProps<T> = TableHeaderProps$1<T> & Omit<HTMLNextUIProps<"thead">, keyof TableHeaderProps$1<T>>;
declare const TableHeader: <T>(props: TableHeaderProps<T>) => JSX.Element;

export { TableHeaderProps, TableHeader as default };
