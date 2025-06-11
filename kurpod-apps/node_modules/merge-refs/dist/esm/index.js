/**
 * A function that merges React refs into one.
 * Supports both functions and ref objects created using createRef() and useRef().
 *
 * Usage:
 * ```tsx
 * <div ref={mergeRefs(ref1, ref2, ref3)} />
 * ```
 *
 * @param {(React.Ref<T> | undefined)[]} inputRefs Array of refs
 * @returns {React.Ref<T> | React.RefCallback<T>} Merged refs
 */
export default function mergeRefs() {
    var inputRefs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputRefs[_i] = arguments[_i];
    }
    var filteredInputRefs = inputRefs.filter(Boolean);
    if (filteredInputRefs.length <= 1) {
        var firstRef = filteredInputRefs[0];
        return firstRef || null;
    }
    return function mergedRefs(ref) {
        filteredInputRefs.forEach(function (inputRef) {
            if (typeof inputRef === 'function') {
                inputRef(ref);
            }
            else if (inputRef) {
                inputRef.current = ref;
            }
        });
    };
}
