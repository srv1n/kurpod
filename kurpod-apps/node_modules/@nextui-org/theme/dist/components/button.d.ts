import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Button wrapper **Tailwind Variants** component
 *
 * const classNames = button({...})
 *
 * @example
 * <button
 *  className={classNames())}
 *  data-pressed={true/false}
 *  data-hover={true/false}
 *  data-focus={true/false}
 *  data-focus-visible={true/false}
 * >
 *   Button
 * </button>
 */
declare const button: tailwind_variants.TVReturnType<{
    variant: {
        solid: "";
        bordered: "border-medium bg-transparent";
        light: "bg-transparent";
        flat: "";
        faded: "border-medium";
        shadow: "";
        ghost: "border-medium bg-transparent";
    };
    size: {
        sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small";
        md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium";
        lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large";
    };
    color: {
        default: "";
        primary: "";
        secondary: "";
        success: "";
        warning: "";
        danger: "";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-small";
        md: "rounded-medium";
        lg: "rounded-large";
        full: "rounded-full";
    };
    fullWidth: {
        true: "w-full";
    };
    isDisabled: {
        true: "opacity-disabled pointer-events-none";
    };
    isInGroup: {
        true: "[&:not(:first-child):not(:last-child)]:rounded-none";
    };
    isIconOnly: {
        true: "px-0 !gap-0";
        false: "[&>svg]:max-w-[theme(spacing.8)]";
    };
    disableAnimation: {
        true: "!transition-none data-[pressed=true]:scale-100";
        false: "transition-transform-colors-opacity motion-reduce:transition-none";
    };
}, undefined, string[], tailwind_variants_dist_config.TVConfig<{
    variant: {
        solid: "";
        bordered: "border-medium bg-transparent";
        light: "bg-transparent";
        flat: "";
        faded: "border-medium";
        shadow: "";
        ghost: "border-medium bg-transparent";
    };
    size: {
        sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small";
        md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium";
        lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large";
    };
    color: {
        default: "";
        primary: "";
        secondary: "";
        success: "";
        warning: "";
        danger: "";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-small";
        md: "rounded-medium";
        lg: "rounded-large";
        full: "rounded-full";
    };
    fullWidth: {
        true: "w-full";
    };
    isDisabled: {
        true: "opacity-disabled pointer-events-none";
    };
    isInGroup: {
        true: "[&:not(:first-child):not(:last-child)]:rounded-none";
    };
    isIconOnly: {
        true: "px-0 !gap-0";
        false: "[&>svg]:max-w-[theme(spacing.8)]";
    };
    disableAnimation: {
        true: "!transition-none data-[pressed=true]:scale-100";
        false: "transition-transform-colors-opacity motion-reduce:transition-none";
    };
}, {
    variant: {
        solid: "";
        bordered: "border-medium bg-transparent";
        light: "bg-transparent";
        flat: "";
        faded: "border-medium";
        shadow: "";
        ghost: "border-medium bg-transparent";
    };
    size: {
        sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small";
        md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium";
        lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large";
    };
    color: {
        default: "";
        primary: "";
        secondary: "";
        success: "";
        warning: "";
        danger: "";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-small";
        md: "rounded-medium";
        lg: "rounded-large";
        full: "rounded-full";
    };
    fullWidth: {
        true: "w-full";
    };
    isDisabled: {
        true: "opacity-disabled pointer-events-none";
    };
    isInGroup: {
        true: "[&:not(:first-child):not(:last-child)]:rounded-none";
    };
    isIconOnly: {
        true: "px-0 !gap-0";
        false: "[&>svg]:max-w-[theme(spacing.8)]";
    };
    disableAnimation: {
        true: "!transition-none data-[pressed=true]:scale-100";
        false: "transition-transform-colors-opacity motion-reduce:transition-none";
    };
}>, {
    variant: {
        solid: "";
        bordered: "border-medium bg-transparent";
        light: "bg-transparent";
        flat: "";
        faded: "border-medium";
        shadow: "";
        ghost: "border-medium bg-transparent";
    };
    size: {
        sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small";
        md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium";
        lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large";
    };
    color: {
        default: "";
        primary: "";
        secondary: "";
        success: "";
        warning: "";
        danger: "";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-small";
        md: "rounded-medium";
        lg: "rounded-large";
        full: "rounded-full";
    };
    fullWidth: {
        true: "w-full";
    };
    isDisabled: {
        true: "opacity-disabled pointer-events-none";
    };
    isInGroup: {
        true: "[&:not(:first-child):not(:last-child)]:rounded-none";
    };
    isIconOnly: {
        true: "px-0 !gap-0";
        false: "[&>svg]:max-w-[theme(spacing.8)]";
    };
    disableAnimation: {
        true: "!transition-none data-[pressed=true]:scale-100";
        false: "transition-transform-colors-opacity motion-reduce:transition-none";
    };
}, undefined, tailwind_variants.TVReturnType<{
    variant: {
        solid: "";
        bordered: "border-medium bg-transparent";
        light: "bg-transparent";
        flat: "";
        faded: "border-medium";
        shadow: "";
        ghost: "border-medium bg-transparent";
    };
    size: {
        sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small";
        md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium";
        lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large";
    };
    color: {
        default: "";
        primary: "";
        secondary: "";
        success: "";
        warning: "";
        danger: "";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-small";
        md: "rounded-medium";
        lg: "rounded-large";
        full: "rounded-full";
    };
    fullWidth: {
        true: "w-full";
    };
    isDisabled: {
        true: "opacity-disabled pointer-events-none";
    };
    isInGroup: {
        true: "[&:not(:first-child):not(:last-child)]:rounded-none";
    };
    isIconOnly: {
        true: "px-0 !gap-0";
        false: "[&>svg]:max-w-[theme(spacing.8)]";
    };
    disableAnimation: {
        true: "!transition-none data-[pressed=true]:scale-100";
        false: "transition-transform-colors-opacity motion-reduce:transition-none";
    };
}, undefined, string[], tailwind_variants_dist_config.TVConfig<{
    variant: {
        solid: "";
        bordered: "border-medium bg-transparent";
        light: "bg-transparent";
        flat: "";
        faded: "border-medium";
        shadow: "";
        ghost: "border-medium bg-transparent";
    };
    size: {
        sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small";
        md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium";
        lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large";
    };
    color: {
        default: "";
        primary: "";
        secondary: "";
        success: "";
        warning: "";
        danger: "";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-small";
        md: "rounded-medium";
        lg: "rounded-large";
        full: "rounded-full";
    };
    fullWidth: {
        true: "w-full";
    };
    isDisabled: {
        true: "opacity-disabled pointer-events-none";
    };
    isInGroup: {
        true: "[&:not(:first-child):not(:last-child)]:rounded-none";
    };
    isIconOnly: {
        true: "px-0 !gap-0";
        false: "[&>svg]:max-w-[theme(spacing.8)]";
    };
    disableAnimation: {
        true: "!transition-none data-[pressed=true]:scale-100";
        false: "transition-transform-colors-opacity motion-reduce:transition-none";
    };
}, {
    variant: {
        solid: "";
        bordered: "border-medium bg-transparent";
        light: "bg-transparent";
        flat: "";
        faded: "border-medium";
        shadow: "";
        ghost: "border-medium bg-transparent";
    };
    size: {
        sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small";
        md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium";
        lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large";
    };
    color: {
        default: "";
        primary: "";
        secondary: "";
        success: "";
        warning: "";
        danger: "";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-small";
        md: "rounded-medium";
        lg: "rounded-large";
        full: "rounded-full";
    };
    fullWidth: {
        true: "w-full";
    };
    isDisabled: {
        true: "opacity-disabled pointer-events-none";
    };
    isInGroup: {
        true: "[&:not(:first-child):not(:last-child)]:rounded-none";
    };
    isIconOnly: {
        true: "px-0 !gap-0";
        false: "[&>svg]:max-w-[theme(spacing.8)]";
    };
    disableAnimation: {
        true: "!transition-none data-[pressed=true]:scale-100";
        false: "transition-transform-colors-opacity motion-reduce:transition-none";
    };
}>, unknown, unknown, undefined>>;
/**
 * ButtonGroup wrapper **Tailwind Variants** component
 *
 * const classNames = buttonGroup({...})
 *
 * @example
 * <div role="group" className={classNames())}>
 *   // button elements
 * </div>
 */
declare const buttonGroup: tailwind_variants.TVReturnType<{
    fullWidth: {
        true: "w-full";
    };
}, undefined, "inline-flex items-center justify-center h-auto", tailwind_variants_dist_config.TVConfig<{
    fullWidth: {
        true: "w-full";
    };
}, {
    fullWidth: {
        true: "w-full";
    };
}>, {
    fullWidth: {
        true: "w-full";
    };
}, undefined, tailwind_variants.TVReturnType<{
    fullWidth: {
        true: "w-full";
    };
}, undefined, "inline-flex items-center justify-center h-auto", tailwind_variants_dist_config.TVConfig<{
    fullWidth: {
        true: "w-full";
    };
}, {
    fullWidth: {
        true: "w-full";
    };
}>, unknown, unknown, undefined>>;
type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;
type ButtonVariantProps = VariantProps<typeof button>;

export { ButtonGroupVariantProps, ButtonVariantProps, button, buttonGroup };
