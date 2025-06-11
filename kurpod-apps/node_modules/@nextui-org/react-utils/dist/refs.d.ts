import * as React from 'react';

type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T>;
/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
declare function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T): void;
/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
declare function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]): (node: T | null) => void;

export { ReactRef, assignRef, mergeRefs };
