import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Link wrapper **Tailwind Variants** component
 *
 * @example
 * <a className={link({ color: "secondary", isBlock: true })} href="#" />
 */
declare const link: tailwind_variants.TVReturnType<{
    size: {
        sm: "text-small";
        md: "text-medium";
        lg: "text-large";
    };
    color: {
        foreground: "text-foreground";
        primary: "text-primary";
        secondary: "text-secondary";
        success: "text-success";
        warning: "text-warning";
        danger: "text-danger";
    };
    underline: {
        none: "no-underline";
        hover: "hover:underline";
        always: "underline";
        active: "active:underline";
        focus: "focus:underline";
    };
    isBlock: {
        true: string[];
        false: "hover:opacity-80 active:opacity-disabled transition-opacity";
    };
    isDisabled: {
        true: "opacity-disabled cursor-default pointer-events-none";
    };
    disableAnimation: {
        true: "after:transition-none transition-none";
    };
}, undefined, string[], tailwind_variants_dist_config.TVConfig<{
    size: {
        sm: "text-small";
        md: "text-medium";
        lg: "text-large";
    };
    color: {
        foreground: "text-foreground";
        primary: "text-primary";
        secondary: "text-secondary";
        success: "text-success";
        warning: "text-warning";
        danger: "text-danger";
    };
    underline: {
        none: "no-underline";
        hover: "hover:underline";
        always: "underline";
        active: "active:underline";
        focus: "focus:underline";
    };
    isBlock: {
        true: string[];
        false: "hover:opacity-80 active:opacity-disabled transition-opacity";
    };
    isDisabled: {
        true: "opacity-disabled cursor-default pointer-events-none";
    };
    disableAnimation: {
        true: "after:transition-none transition-none";
    };
}, {
    size: {
        sm: "text-small";
        md: "text-medium";
        lg: "text-large";
    };
    color: {
        foreground: "text-foreground";
        primary: "text-primary";
        secondary: "text-secondary";
        success: "text-success";
        warning: "text-warning";
        danger: "text-danger";
    };
    underline: {
        none: "no-underline";
        hover: "hover:underline";
        always: "underline";
        active: "active:underline";
        focus: "focus:underline";
    };
    isBlock: {
        true: string[];
        false: "hover:opacity-80 active:opacity-disabled transition-opacity";
    };
    isDisabled: {
        true: "opacity-disabled cursor-default pointer-events-none";
    };
    disableAnimation: {
        true: "after:transition-none transition-none";
    };
}>, {
    size: {
        sm: "text-small";
        md: "text-medium";
        lg: "text-large";
    };
    color: {
        foreground: "text-foreground";
        primary: "text-primary";
        secondary: "text-secondary";
        success: "text-success";
        warning: "text-warning";
        danger: "text-danger";
    };
    underline: {
        none: "no-underline";
        hover: "hover:underline";
        always: "underline";
        active: "active:underline";
        focus: "focus:underline";
    };
    isBlock: {
        true: string[];
        false: "hover:opacity-80 active:opacity-disabled transition-opacity";
    };
    isDisabled: {
        true: "opacity-disabled cursor-default pointer-events-none";
    };
    disableAnimation: {
        true: "after:transition-none transition-none";
    };
}, undefined, tailwind_variants.TVReturnType<{
    size: {
        sm: "text-small";
        md: "text-medium";
        lg: "text-large";
    };
    color: {
        foreground: "text-foreground";
        primary: "text-primary";
        secondary: "text-secondary";
        success: "text-success";
        warning: "text-warning";
        danger: "text-danger";
    };
    underline: {
        none: "no-underline";
        hover: "hover:underline";
        always: "underline";
        active: "active:underline";
        focus: "focus:underline";
    };
    isBlock: {
        true: string[];
        false: "hover:opacity-80 active:opacity-disabled transition-opacity";
    };
    isDisabled: {
        true: "opacity-disabled cursor-default pointer-events-none";
    };
    disableAnimation: {
        true: "after:transition-none transition-none";
    };
}, undefined, string[], tailwind_variants_dist_config.TVConfig<{
    size: {
        sm: "text-small";
        md: "text-medium";
        lg: "text-large";
    };
    color: {
        foreground: "text-foreground";
        primary: "text-primary";
        secondary: "text-secondary";
        success: "text-success";
        warning: "text-warning";
        danger: "text-danger";
    };
    underline: {
        none: "no-underline";
        hover: "hover:underline";
        always: "underline";
        active: "active:underline";
        focus: "focus:underline";
    };
    isBlock: {
        true: string[];
        false: "hover:opacity-80 active:opacity-disabled transition-opacity";
    };
    isDisabled: {
        true: "opacity-disabled cursor-default pointer-events-none";
    };
    disableAnimation: {
        true: "after:transition-none transition-none";
    };
}, {
    size: {
        sm: "text-small";
        md: "text-medium";
        lg: "text-large";
    };
    color: {
        foreground: "text-foreground";
        primary: "text-primary";
        secondary: "text-secondary";
        success: "text-success";
        warning: "text-warning";
        danger: "text-danger";
    };
    underline: {
        none: "no-underline";
        hover: "hover:underline";
        always: "underline";
        active: "active:underline";
        focus: "focus:underline";
    };
    isBlock: {
        true: string[];
        false: "hover:opacity-80 active:opacity-disabled transition-opacity";
    };
    isDisabled: {
        true: "opacity-disabled cursor-default pointer-events-none";
    };
    disableAnimation: {
        true: "after:transition-none transition-none";
    };
}>, unknown, unknown, undefined>>;
declare const linkAnchorClasses = "flex mx-1 text-current self-center";
type LinkVariantProps = VariantProps<typeof link>;

export { LinkVariantProps, link, linkAnchorClasses };
