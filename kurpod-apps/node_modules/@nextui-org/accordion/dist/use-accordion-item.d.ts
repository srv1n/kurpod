import * as framer_motion from 'framer-motion';
import { AccordionItemBaseProps, AccordionItemIndicatorProps } from './base/accordion-item-base.js';
import * as react from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { AccordionItemVariantProps } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { NodeWithProps } from '@nextui-org/aria-utils';
import { TreeState } from '@react-stately/tree';
import '@react-types/shared';

interface Props<T extends object> extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLButtonElement | null>;
    /**
     * The item node.
     */
    item: NodeWithProps<T, AccordionItemBaseProps<T>>;
    /**
     * The accordion tree state.
     */
    state: TreeState<T>;
    /**
     * Current focused key.
     */
    focusedKey: React.Key | null;
    /**
     * Callback fired when the focus state changes.
     */
    onFocusChange?: (isFocused: boolean, key?: React.Key) => void;
}
type UseAccordionItemProps<T extends object = {}> = Props<T> & AccordionItemVariantProps & Omit<AccordionItemBaseProps, "onFocusChange">;
declare function useAccordionItem<T extends object = {}>(props: UseAccordionItemProps<T>): {
    Component: _nextui_org_system.As<any>;
    HeadingComponent: _nextui_org_system.As<any>;
    item: NodeWithProps<T, AccordionItemBaseProps<T>>;
    slots: {
        base: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        heading: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        trigger: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        startContent: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        indicator: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        titleWrapper: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        subtitle: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        heading: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        trigger: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        startContent: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        indicator: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        titleWrapper: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        subtitle: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            variant?: "splitted" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            hideIndicator?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableIndicatorAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: {
        base?: any;
        heading?: any;
        startContent?: any;
        indicator?: any;
        titleWrapper?: any;
        title?: any;
        subtitle?: any;
        content?: any;
        trigger?: any;
    };
    domRef: react.RefObject<HTMLButtonElement>;
    indicator: react.ReactNode | ((props: AccordionItemIndicatorProps) => react.ReactNode);
    children: react.ReactNode;
    title: string | (string & react.ReactElement<any, string | react.JSXElementConstructor<any>>) | (string & react.ReactFragment) | (string & react.ReactPortal) | undefined;
    subtitle: react.ReactNode;
    startContent: react.ReactNode;
    isOpen: boolean;
    isDisabled: boolean;
    hideIndicator: boolean;
    keepContentMounted: boolean;
    disableAnimation: boolean;
    motionProps: framer_motion.HTMLMotionProps<"section"> | undefined;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getHeadingProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getButtonProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getContentProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getIndicatorProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getTitleProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getSubtitleProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;

export { Props, UseAccordionItemProps, UseAccordionItemReturn, useAccordionItem };
