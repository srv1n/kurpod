import { AriaAccordionProps } from '@react-types/accordion';
import { ButtonHTMLAttributes, RefObject } from 'react';
import { DOMAttributes, Node } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';

interface AccordionAria {
    /** Props for the accordion container element. */
    accordionProps: DOMAttributes;
}
interface AccordionItemAriaProps<T> {
    item: Node<T>;
}
interface AccordionItemAria {
    /** Props for the accordion item button. */
    buttonProps: ButtonHTMLAttributes<HTMLElement>;
    /** Props for the accordion item content element. */
    regionProps: DOMAttributes;
}
declare function useReactAriaAccordion<T>(props: AriaAccordionProps<T>, state: TreeState<T>, ref: RefObject<HTMLDivElement>): AccordionAria;

export { AccordionAria, AccordionItemAria, AccordionItemAriaProps, useReactAriaAccordion };
