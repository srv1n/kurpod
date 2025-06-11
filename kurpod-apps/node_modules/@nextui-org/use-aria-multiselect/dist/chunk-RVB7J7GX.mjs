// src/use-multiselect-list-state.ts
import { useListState } from "@react-stately/list";
import { useMemo } from "react";
function useMultiSelectListState(props) {
  const {
    collection,
    disabledKeys,
    selectionManager,
    selectionManager: { setSelectedKeys, selectedKeys, selectionMode }
  } = useListState(props);
  const missingKeys = useMemo(() => {
    if (!props.isLoading && selectedKeys.size !== 0) {
      return Array.from(selectedKeys).filter(Boolean).filter((key) => !collection.getItem(key));
    }
    return [];
  }, [selectedKeys, collection]);
  const selectedItems = selectedKeys.size !== 0 ? Array.from(selectedKeys).map((key) => {
    return collection.getItem(key);
  }).filter(Boolean) : null;
  if (missingKeys.length) {
    console.warn(
      `Select: Keys "${missingKeys.join(
        ", "
      )}" passed to "selectedKeys" are not present in the collection.`
    );
  }
  return {
    collection,
    disabledKeys,
    selectionManager,
    selectionMode,
    selectedKeys,
    setSelectedKeys: setSelectedKeys.bind(selectionManager),
    selectedItems
  };
}

export {
  useMultiSelectListState
};
