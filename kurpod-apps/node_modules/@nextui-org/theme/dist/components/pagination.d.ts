import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Pagination wrapper **Tailwind Variants** component
 *
 * const {base,cursor, prev, next, item } = pagination({...})
 *
 * @example
 * <ul className={base()} aria-label="pagination navigation">
 *    <li className={cursor()} aria-hidden="true">{active page}</li> // this marks the active page
 *    <li role="button" className={prev()} aria-label="Go to previous page" data-disabled="true">Prev</li>
 *    <li role="button" className={item()} aria-label="page 1" data-active="true">1</li>
 *    <li role="button" className={item()} aria-label="page 2">2</li>
 *    <li role="button" className={item()} aria-hidden="true">...</li>
 *    <li role="button" className={item()} aria-label="page 10">10</li>
 *    <li role="button" className={next()} aria-label="Go to next page">Next</li>
 *  </ul>
 */
declare const pagination: tailwind_variants.TVReturnType<{
    variant: {
        bordered: {
            item: string[];
        };
        light: {
            item: string;
        };
        flat: {};
        faded: {
            item: string[];
        };
    };
    color: {
        default: {
            cursor: string;
        };
        primary: {
            cursor: string;
        };
        secondary: {
            cursor: string;
        };
        success: {
            cursor: string;
        };
        warning: {
            cursor: string;
        };
        danger: {
            cursor: string;
        };
    };
    size: {
        sm: {};
        md: {};
        lg: {};
    };
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    isCompact: {
        true: {
            wrapper: string;
            item: string[];
            prev: string;
            next: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    showShadow: {
        true: {};
    };
    disableCursorAnimation: {
        true: {
            cursor: string;
        };
    };
    disableAnimation: {
        true: {
            item: string;
            cursor: string;
        };
        false: {
            item: string[];
            cursor: string[];
        };
    };
}, {
    base: string[];
    wrapper: string[];
    item: string[];
    prev: string;
    next: string;
    cursor: string[];
    forwardIcon: string[];
    ellipsis: string;
    chevronNext: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        bordered: {
            item: string[];
        };
        light: {
            item: string;
        };
        flat: {};
        faded: {
            item: string[];
        };
    };
    color: {
        default: {
            cursor: string;
        };
        primary: {
            cursor: string;
        };
        secondary: {
            cursor: string;
        };
        success: {
            cursor: string;
        };
        warning: {
            cursor: string;
        };
        danger: {
            cursor: string;
        };
    };
    size: {
        sm: {};
        md: {};
        lg: {};
    };
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    isCompact: {
        true: {
            wrapper: string;
            item: string[];
            prev: string;
            next: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    showShadow: {
        true: {};
    };
    disableCursorAnimation: {
        true: {
            cursor: string;
        };
    };
    disableAnimation: {
        true: {
            item: string;
            cursor: string;
        };
        false: {
            item: string[];
            cursor: string[];
        };
    };
}, {
    variant: {
        bordered: {
            item: string[];
        };
        light: {
            item: string;
        };
        flat: {};
        faded: {
            item: string[];
        };
    };
    color: {
        default: {
            cursor: string;
        };
        primary: {
            cursor: string;
        };
        secondary: {
            cursor: string;
        };
        success: {
            cursor: string;
        };
        warning: {
            cursor: string;
        };
        danger: {
            cursor: string;
        };
    };
    size: {
        sm: {};
        md: {};
        lg: {};
    };
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    isCompact: {
        true: {
            wrapper: string;
            item: string[];
            prev: string;
            next: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    showShadow: {
        true: {};
    };
    disableCursorAnimation: {
        true: {
            cursor: string;
        };
    };
    disableAnimation: {
        true: {
            item: string;
            cursor: string;
        };
        false: {
            item: string[];
            cursor: string[];
        };
    };
}>, {
    variant: {
        bordered: {
            item: string[];
        };
        light: {
            item: string;
        };
        flat: {};
        faded: {
            item: string[];
        };
    };
    color: {
        default: {
            cursor: string;
        };
        primary: {
            cursor: string;
        };
        secondary: {
            cursor: string;
        };
        success: {
            cursor: string;
        };
        warning: {
            cursor: string;
        };
        danger: {
            cursor: string;
        };
    };
    size: {
        sm: {};
        md: {};
        lg: {};
    };
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    isCompact: {
        true: {
            wrapper: string;
            item: string[];
            prev: string;
            next: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    showShadow: {
        true: {};
    };
    disableCursorAnimation: {
        true: {
            cursor: string;
        };
    };
    disableAnimation: {
        true: {
            item: string;
            cursor: string;
        };
        false: {
            item: string[];
            cursor: string[];
        };
    };
}, {
    base: string[];
    wrapper: string[];
    item: string[];
    prev: string;
    next: string;
    cursor: string[];
    forwardIcon: string[];
    ellipsis: string;
    chevronNext: string;
}, tailwind_variants.TVReturnType<{
    variant: {
        bordered: {
            item: string[];
        };
        light: {
            item: string;
        };
        flat: {};
        faded: {
            item: string[];
        };
    };
    color: {
        default: {
            cursor: string;
        };
        primary: {
            cursor: string;
        };
        secondary: {
            cursor: string;
        };
        success: {
            cursor: string;
        };
        warning: {
            cursor: string;
        };
        danger: {
            cursor: string;
        };
    };
    size: {
        sm: {};
        md: {};
        lg: {};
    };
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    isCompact: {
        true: {
            wrapper: string;
            item: string[];
            prev: string;
            next: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    showShadow: {
        true: {};
    };
    disableCursorAnimation: {
        true: {
            cursor: string;
        };
    };
    disableAnimation: {
        true: {
            item: string;
            cursor: string;
        };
        false: {
            item: string[];
            cursor: string[];
        };
    };
}, {
    base: string[];
    wrapper: string[];
    item: string[];
    prev: string;
    next: string;
    cursor: string[];
    forwardIcon: string[];
    ellipsis: string;
    chevronNext: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        bordered: {
            item: string[];
        };
        light: {
            item: string;
        };
        flat: {};
        faded: {
            item: string[];
        };
    };
    color: {
        default: {
            cursor: string;
        };
        primary: {
            cursor: string;
        };
        secondary: {
            cursor: string;
        };
        success: {
            cursor: string;
        };
        warning: {
            cursor: string;
        };
        danger: {
            cursor: string;
        };
    };
    size: {
        sm: {};
        md: {};
        lg: {};
    };
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    isCompact: {
        true: {
            wrapper: string;
            item: string[];
            prev: string;
            next: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    showShadow: {
        true: {};
    };
    disableCursorAnimation: {
        true: {
            cursor: string;
        };
    };
    disableAnimation: {
        true: {
            item: string;
            cursor: string;
        };
        false: {
            item: string[];
            cursor: string[];
        };
    };
}, {
    variant: {
        bordered: {
            item: string[];
        };
        light: {
            item: string;
        };
        flat: {};
        faded: {
            item: string[];
        };
    };
    color: {
        default: {
            cursor: string;
        };
        primary: {
            cursor: string;
        };
        secondary: {
            cursor: string;
        };
        success: {
            cursor: string;
        };
        warning: {
            cursor: string;
        };
        danger: {
            cursor: string;
        };
    };
    size: {
        sm: {};
        md: {};
        lg: {};
    };
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    isCompact: {
        true: {
            wrapper: string;
            item: string[];
            prev: string;
            next: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    showShadow: {
        true: {};
    };
    disableCursorAnimation: {
        true: {
            cursor: string;
        };
    };
    disableAnimation: {
        true: {
            item: string;
            cursor: string;
        };
        false: {
            item: string[];
            cursor: string[];
        };
    };
}>, unknown, unknown, undefined>>;
type PaginationVariantProps = VariantProps<typeof pagination>;
type PaginationSlots = keyof ReturnType<typeof pagination>;

export { PaginationSlots, PaginationVariantProps, pagination };
