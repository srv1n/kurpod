import { HTMLNextUIProps } from '@nextui-org/system';
import { SpectrumColumnProps } from '@react-types/table';

type TableColumnProps<T> = Omit<SpectrumColumnProps<T>, "showDivider"> & Omit<HTMLNextUIProps<"th">, keyof SpectrumColumnProps<T>>;
declare const TableColumn: <T>(props: TableColumnProps<T>) => JSX.Element;

export { TableColumnProps, TableColumn as default };
