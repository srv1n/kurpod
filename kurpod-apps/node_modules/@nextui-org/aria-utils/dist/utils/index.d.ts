interface Event {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
}
declare function isNonContiguousSelectionModifier(e: Event): boolean;
declare function isCtrlKeyPressed(e: Event): boolean;

export { isCtrlKeyPressed, isNonContiguousSelectionModifier };
