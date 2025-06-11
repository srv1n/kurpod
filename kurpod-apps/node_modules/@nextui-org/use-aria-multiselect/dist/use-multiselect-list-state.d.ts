import { ListState } from '@react-stately/list';
import { CollectionBase, AsyncLoadable, MultipleSelection, Node } from '@react-types/shared';
import { Key } from 'react';

interface MultiSelectListProps<T> extends CollectionBase<T>, AsyncLoadable, MultipleSelection {
}
interface MultiSelectListState<T> extends ListState<T> {
    /** The keys for the currently selected items. */
    selectedKeys: Set<Key>;
    /** Sets the selected keys. */
    setSelectedKeys(keys: Iterable<Key>): void;
    /** The value of the currently selected items. */
    selectedItems: Node<T>[] | null;
    /** The type of selection. */
    selectionMode: MultipleSelection["selectionMode"];
}
declare function useMultiSelectListState<T extends object>(props: MultiSelectListProps<T>): MultiSelectListState<T>;

export { MultiSelectListProps, MultiSelectListState, useMultiSelectListState };
