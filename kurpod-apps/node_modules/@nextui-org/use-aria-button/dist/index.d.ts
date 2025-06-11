import { ElementType, RefObject, ButtonHTMLAttributes, AnchorHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import { AriaButtonProps as AriaButtonProps$1 } from '@react-types/button';
import { DOMAttributes } from '@react-types/shared';

type AriaButtonProps<T extends ElementType = "button"> = AriaButtonProps$1<T> & {
    /** Whether text selection should be enabled on the pressable element. */
    allowTextSelectionOnPress?: boolean;
};
interface ButtonAria<T> {
    /** Props for the button element. */
    buttonProps: T;
    /** Whether the button is currently pressed. */
    isPressed: boolean;
}
declare function useAriaButton(props: AriaButtonProps<"button">, ref: RefObject<HTMLButtonElement>): ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>;
declare function useAriaButton(props: AriaButtonProps<"a">, ref: RefObject<HTMLAnchorElement>): ButtonAria<AnchorHTMLAttributes<HTMLAnchorElement>>;
declare function useAriaButton(props: AriaButtonProps<"div">, ref: RefObject<HTMLDivElement>): ButtonAria<HTMLAttributes<HTMLDivElement>>;
declare function useAriaButton(props: AriaButtonProps<"input">, ref: RefObject<HTMLInputElement>): ButtonAria<InputHTMLAttributes<HTMLInputElement>>;
declare function useAriaButton(props: AriaButtonProps<"span">, ref: RefObject<HTMLSpanElement>): ButtonAria<HTMLAttributes<HTMLSpanElement>>;
declare function useAriaButton(props: AriaButtonProps<ElementType>, ref: RefObject<Element>): ButtonAria<DOMAttributes>;

export { AriaButtonProps, ButtonAria, useAriaButton };
