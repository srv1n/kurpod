import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { PaginationVariantProps, SlotsToClasses, PaginationSlots } from '@nextui-org/theme';
import { Ref, Key, ReactNode } from 'react';
import { PaginationItemValue, UsePaginationProps as UsePaginationProps$1 } from '@nextui-org/use-pagination';
import { PressEvent } from '@react-types/shared';

type PaginationItemRenderProps = {
    /**
     * The pagination item ref.
     */
    ref?: Ref<any>;
    /**
     * React key.
     */
    key?: Key;
    /**
     * The pagination item value.
     */
    children?: ReactNode;
    /**
     * The pagination item value.
     */
    value: PaginationItemValue;
    /**
     * The pagination item index.
     */
    index: number;
    /**
     * Calculated pagination item position. This includes the dots.
     */
    page: number;
    /**
     * The pagination total number of pages.
     */
    total: number;
    /**
     * The active page number.
     */
    activePage: number;
    /**
     * Whether the pagination item is active.
     */
    isActive: boolean;
    /**
     * Whether the item is before the active page.
     */
    isBefore: boolean;
    /**
     * Whether the pagination item is the first item in the pagination.
     */
    isFirst: boolean;
    /**
     * Whether the pagination item is the last item in the pagination.
     */
    isLast: boolean;
    /**
     * Whether the pagination item is the next item in the pagination.
     */
    isNext: boolean;
    /**
     * Number of pages that are added or subtracted on the '...' button.
     * @default 5
     */
    dotsJump: number;
    /**
     * Whether the pagination item is the previous item in the pagination.
     */
    isPrevious: boolean;
    /**
     * The pagination item className.
     */
    className: string;
    /**
     * Callback to go to the next page.
     */
    onNext: () => void;
    /**
     * Callback to go to the previous page.
     */
    onPrevious: () => void;
    /**
     * Callback to go to the page.
     */
    setPage: (page: number) => void;
    /**
     * Callback fired when the item is clicked.
     * @param e PressEvent
     */
    onPress?: (e: PressEvent) => void;
    /**
     * Function to get the aria-label of the item.
     */
    getAriaLabel?: (page?: PaginationItemValue) => string | undefined;
};
interface Props extends Omit<HTMLNextUIProps<"nav">, "onChange"> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<HTMLElement>;
    /**
     * Number of pages that are added or subtracted on the '...' button.
     * @default 5
     */
    dotsJump?: number;
    /**
     * Non disable next/previous controls
     * @default false
     */
    loop?: boolean;
    /**
     * Whether the pagination should display controls (left/right arrows).
     * @default true
     */
    showControls?: boolean;
    /**
     * Render a custom pagination item.
     * @param props Pagination item props
     * @returns ReactNode
     */
    renderItem?: (props: PaginationItemRenderProps) => ReactNode;
    /**
     * Function to get the aria-label of the item. If not provided, pagination will use the default one.
     */
    getItemAriaLabel?: (page?: string | PaginationItemValue) => string;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Pagination classNames={{
     *    base:"base-classes",
     *    prev: "prev-classes", // prev button classes
     *    item: "item-classes",
     *    next: "next-classes", // next button classes
     *    cursor: "cursor-classes", // this is the one that moves when an item is selected
     *    forwardIcon: "forward-icon-classes", // forward icon
     *    ellipsis: "ellipsis-classes", // ellipsis icon
     *    chevronNext: "chevron-next-classes", // chevron next icon
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<PaginationSlots>;
}
type UsePaginationProps = Props & UsePaginationProps$1 & PaginationVariantProps;
declare const CURSOR_TRANSITION_TIMEOUT = 300;
declare function usePagination(originalProps: UsePaginationProps): {
    Component: _nextui_org_system.As<any>;
    showControls: boolean;
    dotsJump: number;
    slots: {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        item: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        prev: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        next: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        cursor: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        forwardIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        ellipsis: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        chevronNext: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        item: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        prev: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        next: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        cursor: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        forwardIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        ellipsis: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        chevronNext: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "bordered" | "light" | "flat" | "faded" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCompact?: boolean | undefined;
            isDisabled?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableCursorAnimation?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "prev" | "next" | "ellipsis" | "chevronNext" | "wrapper" | "item" | "cursor" | "forwardIcon"> | undefined;
    loop: boolean;
    total: number;
    range: PaginationItemValue[];
    activePage: number;
    getItemRef: (node: HTMLElement | null, value: number) => void;
    disableAnimation: boolean;
    disableCursorAnimation: boolean;
    setPage: (pageNumber: number) => void;
    onPrevious: () => void;
    onNext: () => void;
    renderItem: ((props: PaginationItemRenderProps) => ReactNode) | undefined;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getItemProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getCursorProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getItemAriaLabel: (page?: string | PaginationItemValue) => string | undefined;
};
type UsePaginationReturn = ReturnType<typeof usePagination>;

export { CURSOR_TRANSITION_TIMEOUT, PaginationItemRenderProps, UsePaginationProps, UsePaginationReturn, usePagination };
