import { ButtonHTMLAttributes, Key, RefObject } from 'react';
import { Node, DOMAttributes } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';

interface AccordionItemAriaProps<T> {
    item: Node<T>;
    isDisabled?: boolean;
}
interface AccordionItemAria {
    /** Props for the accordion item button. */
    buttonProps: ButtonHTMLAttributes<HTMLElement>;
    /** Props for the accordion item content element. */
    regionProps: DOMAttributes;
}
declare function useReactAriaAccordionItem<T>(props: AccordionItemAriaProps<T>, state: TreeState<T> & {
    focusedKey?: Key | null;
}, ref: RefObject<HTMLButtonElement>): AccordionItemAria;

export { AccordionItemAria, AccordionItemAriaProps, useReactAriaAccordionItem };
