import * as _nextui_org_theme from '@nextui-org/theme';
import { AccordionGroupVariantProps } from '@nextui-org/theme';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { MultipleSelection, SelectionBehavior } from '@react-types/shared';
import { AriaAccordionProps } from '@react-types/accordion';
import { ReactRef } from '@nextui-org/react-utils';
import react__default, { Key } from 'react';
import { TreeState } from '@react-stately/tree';
import { DividerProps } from '@nextui-org/divider';
import { AccordionItemProps } from './accordion-item.js';
import './use-accordion-item.js';
import 'framer-motion';
import './base/accordion-item-base.js';
import '@nextui-org/aria-utils';
import 'tailwind-variants';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * Whether to display a divider at the bottom of the each accordion item.
     *
     * @default true
     */
    showDivider?: boolean;
    /**
     * The divider props.
     */
    dividerProps?: Partial<DividerProps>;
    /**
     * The accordion selection behavior.
     * @default "toggle"
     */
    selectionBehavior?: SelectionBehavior;
    /**
     * Whether to keep the accordion content mounted when collapsed.
     * @default false
     */
    keepContentMounted?: boolean;
    /**
     * The accordion items classNames.
     */
    itemClasses?: AccordionItemProps["classNames"];
}
type UseAccordionProps<T extends object = {}> = Props & AccordionGroupVariantProps & Pick<AccordionItemProps, "isCompact" | "isDisabled" | "hideIndicator" | "disableAnimation" | "disableIndicatorAnimation" | "motionProps"> & AriaAccordionProps<T> & MultipleSelection;
type ValuesType<T extends object = {}> = {
    state: TreeState<T>;
    focusedKey?: Key | null;
    isCompact?: AccordionItemProps["isCompact"];
    isDisabled?: AccordionItemProps["isDisabled"];
    hideIndicator?: AccordionItemProps["hideIndicator"];
    disableAnimation?: AccordionItemProps["disableAnimation"];
    keepContentMounted?: Props["keepContentMounted"];
    disableIndicatorAnimation?: AccordionItemProps["disableAnimation"];
    motionProps?: AccordionItemProps["motionProps"];
};
declare function useAccordion<T extends object>(props: UseAccordionProps<T>): {
    Component: _nextui_org_system.As<any>;
    values: ValuesType<T>;
    state: TreeState<T>;
    focusedKey: react__default.Key | null;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    isSplitted: boolean;
    classNames: string;
    showDivider: boolean;
    dividerProps: Partial<DividerProps>;
    disableAnimation: boolean;
    handleFocusChanged: (isFocused: boolean, key: Key | null) => void;
    itemClasses: _nextui_org_theme.SlotsToClasses<"base" | "heading" | "startContent" | "indicator" | "titleWrapper" | "title" | "subtitle" | "content" | "trigger"> | undefined;
};
type UseAccordionReturn = ReturnType<typeof useAccordion>;

export { UseAccordionProps, UseAccordionReturn, ValuesType, useAccordion };
