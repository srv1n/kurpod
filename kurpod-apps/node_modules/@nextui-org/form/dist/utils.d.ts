import { ForwardedRef, CSSProperties, ReactNode, Context } from 'react';
import { DOMProps as DOMProps$1, RefObject } from '@react-types/shared';

declare const DEFAULT_SLOT: unique symbol;
interface SlottedValue<T> {
    slots?: Record<string | symbol, T>;
}
type WithRef<T, E> = T & {
    ref?: ForwardedRef<E>;
};
type SlottedContextValue<T> = SlottedValue<T> | T | null | undefined;
type ContextValue<T, E> = SlottedContextValue<WithRef<T, E>>;
interface StyleProps {
    /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. */
    className?: string;
    /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. */
    style?: CSSProperties;
}
interface DOMProps extends StyleProps, DOMProps$1 {
    /** The children of the component. */
    children?: ReactNode;
}
interface SlotProps {
    /**
     * A slot name for the component. Slots allow the component to receive props from a parent component.
     * An explicit `null` value indicates that the local props completely override all props received from a parent.
     */
    slot?: string | null;
}
declare function useSlottedContext<T>(context: Context<SlottedContextValue<T>>, slot?: string | null): T | null | undefined;
declare function useContextProps<T, U extends SlotProps, E extends Element>(props: T & SlotProps, ref: ForwardedRef<E>, context: Context<ContextValue<U, E>>): [T, RefObject<E | null>];

export { ContextValue, DEFAULT_SLOT, DOMProps, SlotProps, SlottedContextValue, StyleProps, WithRef, useContextProps, useSlottedContext };
