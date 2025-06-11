import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Chip wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, content, dot, avatar, closeButton} = chip({...})
 *
 * <div className={base())}>
 *    // left content
 *   <span className={avatar()}/>
 *   <svg className={dot()}/>
 *   <span className={content()}>Default</span>
 *   <svg className={closeButton()}>close button</svg>
 *    // right content
 * </div>
 * ```
 */
declare const chip: tailwind_variants.TVReturnType<{
    variant: {
        solid: {};
        bordered: {
            base: string;
        };
        light: {
            base: string;
        };
        flat: {};
        faded: {
            base: string;
        };
        shadow: {};
        dot: {
            base: string;
        };
    };
    color: {
        default: {
            dot: string;
        };
        primary: {
            dot: string;
        };
        secondary: {
            dot: string;
        };
        success: {
            dot: string;
        };
        warning: {
            dot: string;
        };
        danger: {
            dot: string;
        };
    };
    size: {
        sm: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        md: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        lg: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        full: {
            base: string;
        };
    };
    isOneChar: {
        true: {};
        false: {};
    };
    isCloseable: {
        true: {};
        false: {};
    };
    hasStartContent: {
        true: {};
    };
    hasEndContent: {
        true: {};
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    isCloseButtonFocusVisible: {
        true: {
            closeButton: string[];
        };
    };
}, {
    base: string[];
    content: string;
    dot: string[];
    avatar: string;
    closeButton: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        solid: {};
        bordered: {
            base: string;
        };
        light: {
            base: string;
        };
        flat: {};
        faded: {
            base: string;
        };
        shadow: {};
        dot: {
            base: string;
        };
    };
    color: {
        default: {
            dot: string;
        };
        primary: {
            dot: string;
        };
        secondary: {
            dot: string;
        };
        success: {
            dot: string;
        };
        warning: {
            dot: string;
        };
        danger: {
            dot: string;
        };
    };
    size: {
        sm: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        md: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        lg: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        full: {
            base: string;
        };
    };
    isOneChar: {
        true: {};
        false: {};
    };
    isCloseable: {
        true: {};
        false: {};
    };
    hasStartContent: {
        true: {};
    };
    hasEndContent: {
        true: {};
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    isCloseButtonFocusVisible: {
        true: {
            closeButton: string[];
        };
    };
}, {
    variant: {
        solid: {};
        bordered: {
            base: string;
        };
        light: {
            base: string;
        };
        flat: {};
        faded: {
            base: string;
        };
        shadow: {};
        dot: {
            base: string;
        };
    };
    color: {
        default: {
            dot: string;
        };
        primary: {
            dot: string;
        };
        secondary: {
            dot: string;
        };
        success: {
            dot: string;
        };
        warning: {
            dot: string;
        };
        danger: {
            dot: string;
        };
    };
    size: {
        sm: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        md: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        lg: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        full: {
            base: string;
        };
    };
    isOneChar: {
        true: {};
        false: {};
    };
    isCloseable: {
        true: {};
        false: {};
    };
    hasStartContent: {
        true: {};
    };
    hasEndContent: {
        true: {};
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    isCloseButtonFocusVisible: {
        true: {
            closeButton: string[];
        };
    };
}>, {
    variant: {
        solid: {};
        bordered: {
            base: string;
        };
        light: {
            base: string;
        };
        flat: {};
        faded: {
            base: string;
        };
        shadow: {};
        dot: {
            base: string;
        };
    };
    color: {
        default: {
            dot: string;
        };
        primary: {
            dot: string;
        };
        secondary: {
            dot: string;
        };
        success: {
            dot: string;
        };
        warning: {
            dot: string;
        };
        danger: {
            dot: string;
        };
    };
    size: {
        sm: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        md: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        lg: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        full: {
            base: string;
        };
    };
    isOneChar: {
        true: {};
        false: {};
    };
    isCloseable: {
        true: {};
        false: {};
    };
    hasStartContent: {
        true: {};
    };
    hasEndContent: {
        true: {};
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    isCloseButtonFocusVisible: {
        true: {
            closeButton: string[];
        };
    };
}, {
    base: string[];
    content: string;
    dot: string[];
    avatar: string;
    closeButton: string[];
}, tailwind_variants.TVReturnType<{
    variant: {
        solid: {};
        bordered: {
            base: string;
        };
        light: {
            base: string;
        };
        flat: {};
        faded: {
            base: string;
        };
        shadow: {};
        dot: {
            base: string;
        };
    };
    color: {
        default: {
            dot: string;
        };
        primary: {
            dot: string;
        };
        secondary: {
            dot: string;
        };
        success: {
            dot: string;
        };
        warning: {
            dot: string;
        };
        danger: {
            dot: string;
        };
    };
    size: {
        sm: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        md: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        lg: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        full: {
            base: string;
        };
    };
    isOneChar: {
        true: {};
        false: {};
    };
    isCloseable: {
        true: {};
        false: {};
    };
    hasStartContent: {
        true: {};
    };
    hasEndContent: {
        true: {};
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    isCloseButtonFocusVisible: {
        true: {
            closeButton: string[];
        };
    };
}, {
    base: string[];
    content: string;
    dot: string[];
    avatar: string;
    closeButton: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    variant: {
        solid: {};
        bordered: {
            base: string;
        };
        light: {
            base: string;
        };
        flat: {};
        faded: {
            base: string;
        };
        shadow: {};
        dot: {
            base: string;
        };
    };
    color: {
        default: {
            dot: string;
        };
        primary: {
            dot: string;
        };
        secondary: {
            dot: string;
        };
        success: {
            dot: string;
        };
        warning: {
            dot: string;
        };
        danger: {
            dot: string;
        };
    };
    size: {
        sm: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        md: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        lg: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        full: {
            base: string;
        };
    };
    isOneChar: {
        true: {};
        false: {};
    };
    isCloseable: {
        true: {};
        false: {};
    };
    hasStartContent: {
        true: {};
    };
    hasEndContent: {
        true: {};
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    isCloseButtonFocusVisible: {
        true: {
            closeButton: string[];
        };
    };
}, {
    variant: {
        solid: {};
        bordered: {
            base: string;
        };
        light: {
            base: string;
        };
        flat: {};
        faded: {
            base: string;
        };
        shadow: {};
        dot: {
            base: string;
        };
    };
    color: {
        default: {
            dot: string;
        };
        primary: {
            dot: string;
        };
        secondary: {
            dot: string;
        };
        success: {
            dot: string;
        };
        warning: {
            dot: string;
        };
        danger: {
            dot: string;
        };
    };
    size: {
        sm: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        md: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
        lg: {
            base: string;
            content: string;
            closeButton: string;
            avatar: string;
        };
    };
    radius: {
        none: {
            base: string;
        };
        sm: {
            base: string;
        };
        md: {
            base: string;
        };
        lg: {
            base: string;
        };
        full: {
            base: string;
        };
    };
    isOneChar: {
        true: {};
        false: {};
    };
    isCloseable: {
        true: {};
        false: {};
    };
    hasStartContent: {
        true: {};
    };
    hasEndContent: {
        true: {};
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    isCloseButtonFocusVisible: {
        true: {
            closeButton: string[];
        };
    };
}>, unknown, unknown, undefined>>;
type ChipVariantProps = VariantProps<typeof chip>;
type ChipSlots = keyof ReturnType<typeof chip>;

export { ChipSlots, ChipVariantProps, chip };
