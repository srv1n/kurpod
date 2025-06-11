type Dimensions = {
    width: number | null;
    height: number | null;
};
/**
 * A custom hook that measures the dimensions of a DOM element.
 * @returns A tuple containing a ref callback and the dimensions of the measured element.
 */
declare function useMeasure(): [React.RefCallback<Element>, Dimensions];
type UseMeasureReturn = ReturnType<typeof useMeasure>;

export { Dimensions, UseMeasureReturn, useMeasure };
