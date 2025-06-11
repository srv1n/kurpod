import * as react from 'react';
import { ReactNode } from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { KeyboardDelegate } from '@react-types/shared';
import { AriaListBoxProps } from '@react-aria/listbox';
import { ListboxVariantProps, SlotsToClasses, ListboxSlots } from '@nextui-org/theme';
import { ListState } from '@react-stately/list';
import { ReactRef } from '@nextui-org/react-utils';
import { ListboxItemProps } from './listbox-item.js';
import 'react/jsx-runtime';
import './use-listbox-item.js';
import './base/listbox-item-base.js';
import '@nextui-org/aria-utils';

interface AriaListBoxOptions<T> extends AriaListBoxProps<T> {
    /** Whether the listbox uses virtual scrolling. */
    isVirtualized?: boolean;
    /**
     * An optional keyboard delegate implementation for type to select,
     * to override the default.
     */
    keyboardDelegate?: KeyboardDelegate;
    /**
     * Whether the listbox items should use virtual focus instead of being focused directly.
     */
    shouldUseVirtualFocus?: boolean;
    /** Whether selection should occur on press up instead of press down. */
    shouldSelectOnPressUp?: boolean;
    /** Whether options should be focused when the user hovers over them. */
    shouldFocusOnHover?: boolean;
    /** Whether the item should display the same "hover" styles as when it is focused. */
    shouldHighlightOnFocus?: boolean;
}
interface Props<T> extends Omit<HTMLNextUIProps<"ul">, "children"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The controlled state of the listbox.
     */
    state?: ListState<T>;
    /**
     * The listbox items variant.
     */
    variant?: ListboxItemProps["variant"];
    /**
     * The listbox items color.
     */
    color?: ListboxItemProps["color"];
    /**
     * Custom content to be included in the top of the listbox.
     */
    topContent?: ReactNode;
    /**
     * Custom content to be included in the bottom of the listbox.
     */
    bottomContent?: ReactNode;
    /**
     * Whether to not display the empty content when there are no items.
     * @default false
     */
    hideEmptyContent?: boolean;
    /**
     *  Provides content to display when there are no items.
     * @default "No items."
     */
    emptyContent?: ReactNode;
    /**
     * Whether to hide the check icon when the items are selected.
     * @default false
     */
    hideSelectedIcon?: boolean;
    /**
     * Whether to disable the items animation.
     * @default false
     */
    disableAnimation?: boolean;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Listbox classNames={{
     *    base:"base-classes",
     *    emptyContent: "empty-content-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<ListboxSlots>;
    /**
     * The menu items classNames.
     */
    itemClasses?: ListboxItemProps["classNames"];
}
type UseListboxProps<T = object> = Props<T> & AriaListBoxOptions<T> & ListboxVariantProps;
declare function useListbox<T extends object>(props: UseListboxProps<T>): {
    Component: _nextui_org_system.As<any>;
    state: ListState<T>;
    variant: "flat" | "shadow" | "solid" | "bordered" | "light" | "faded" | undefined;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    slots: {
        base: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        list: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        emptyContent: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        list: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        emptyContent: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "list" | "emptyContent"> | undefined;
    topContent: ReactNode;
    bottomContent: ReactNode;
    emptyContent: string | number | boolean | react.ReactElement<any, string | react.JSXElementConstructor<any>> | react.ReactFragment | null;
    hideEmptyContent: boolean;
    shouldHighlightOnFocus: boolean;
    hideSelectedIcon: boolean;
    disableAnimation: boolean;
    className: string | undefined;
    itemClasses: SlotsToClasses<"base" | "title" | "description" | "wrapper" | "selectedIcon" | "shortcut"> | undefined;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getListProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getEmptyContentProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseListboxReturn = ReturnType<typeof useListbox>;

export { UseListboxProps, UseListboxReturn, useListbox };
