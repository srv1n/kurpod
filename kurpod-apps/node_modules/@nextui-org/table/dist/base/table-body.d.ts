import { HTMLNextUIProps } from '@nextui-org/system';
import { TableBodyProps as TableBodyProps$1 } from '@react-types/table';
import { ReactNode } from 'react';

interface TableBodyProps<T> extends TableBodyProps$1<T>, Omit<HTMLNextUIProps<"tbody">, keyof TableBodyProps$1<T>> {
    /**
     * Provides content to display a loading component when the `loadingState` is `loading` or `loadingMore`.
     */
    loadingContent?: ReactNode;
    /**
     * Whether the table data is currently loading.
     * @default false
     */
    isLoading?: boolean;
    /**
     *  Provides content to display when there are no rows in the table.
     * */
    emptyContent?: ReactNode;
}
declare const TableBody: <T>(props: TableBodyProps<T>) => JSX.Element;

export { TableBodyProps, TableBody as default };
