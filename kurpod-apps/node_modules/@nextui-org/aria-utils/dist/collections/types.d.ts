import { CollectionBase } from '@react-types/shared';
import { ReactNode, ReactElement } from 'react';
export { PartialNode } from '@react-stately/collections';

interface CollectionProps<T> extends Omit<CollectionBase<T>, "children" | "items"> {
    items?: T[];
    /** The contents of the collection. */
    children?: ReactNode | ((item: T) => ReactElement);
}

export { CollectionProps };
