import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Popover wrapper **Tailwind Variants** component
 *
 * const { base, content, trigger, backdrop } = popover({...})
 *
 * @example
 * <div>
 *  <div className={backdrop()} />
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={base()}>
 *    <div className={content()} />
 *      // popover content
 *    </div>
 *  </div>
 * </div>
 */
declare const popover: tailwind_variants.TVReturnType<{
    size: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    color: {
        default: {
            base: string;
            content: string;
        };
        foreground: {
            base: string;
            content: string;
        };
        primary: {
            base: string;
            content: string;
        };
        secondary: {
            base: string;
            content: string;
        };
        success: {
            base: string;
            content: string;
        };
        warning: {
            base: string;
            content: string;
        };
        danger: {
            base: string;
            content: string;
        };
    };
    radius: {
        none: {
            content: string;
        };
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
        full: {
            content: string;
        };
    };
    shadow: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    backdrop: {
        transparent: {};
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    triggerScaleOnOpen: {
        true: {
            trigger: string[];
        };
        false: {};
    };
    disableAnimation: {
        true: {
            base: string;
        };
    };
    isTriggerDisabled: {
        true: {
            trigger: string;
        };
        false: {};
    };
}, {
    base: string[];
    content: string[];
    trigger: string[];
    backdrop: string[];
    arrow: never[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    size: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    color: {
        default: {
            base: string;
            content: string;
        };
        foreground: {
            base: string;
            content: string;
        };
        primary: {
            base: string;
            content: string;
        };
        secondary: {
            base: string;
            content: string;
        };
        success: {
            base: string;
            content: string;
        };
        warning: {
            base: string;
            content: string;
        };
        danger: {
            base: string;
            content: string;
        };
    };
    radius: {
        none: {
            content: string;
        };
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
        full: {
            content: string;
        };
    };
    shadow: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    backdrop: {
        transparent: {};
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    triggerScaleOnOpen: {
        true: {
            trigger: string[];
        };
        false: {};
    };
    disableAnimation: {
        true: {
            base: string;
        };
    };
    isTriggerDisabled: {
        true: {
            trigger: string;
        };
        false: {};
    };
}, {
    size: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    color: {
        default: {
            base: string;
            content: string;
        };
        foreground: {
            base: string;
            content: string;
        };
        primary: {
            base: string;
            content: string;
        };
        secondary: {
            base: string;
            content: string;
        };
        success: {
            base: string;
            content: string;
        };
        warning: {
            base: string;
            content: string;
        };
        danger: {
            base: string;
            content: string;
        };
    };
    radius: {
        none: {
            content: string;
        };
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
        full: {
            content: string;
        };
    };
    shadow: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    backdrop: {
        transparent: {};
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    triggerScaleOnOpen: {
        true: {
            trigger: string[];
        };
        false: {};
    };
    disableAnimation: {
        true: {
            base: string;
        };
    };
    isTriggerDisabled: {
        true: {
            trigger: string;
        };
        false: {};
    };
}>, {
    size: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    color: {
        default: {
            base: string;
            content: string;
        };
        foreground: {
            base: string;
            content: string;
        };
        primary: {
            base: string;
            content: string;
        };
        secondary: {
            base: string;
            content: string;
        };
        success: {
            base: string;
            content: string;
        };
        warning: {
            base: string;
            content: string;
        };
        danger: {
            base: string;
            content: string;
        };
    };
    radius: {
        none: {
            content: string;
        };
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
        full: {
            content: string;
        };
    };
    shadow: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    backdrop: {
        transparent: {};
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    triggerScaleOnOpen: {
        true: {
            trigger: string[];
        };
        false: {};
    };
    disableAnimation: {
        true: {
            base: string;
        };
    };
    isTriggerDisabled: {
        true: {
            trigger: string;
        };
        false: {};
    };
}, {
    base: string[];
    content: string[];
    trigger: string[];
    backdrop: string[];
    arrow: never[];
}, tailwind_variants.TVReturnType<{
    size: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    color: {
        default: {
            base: string;
            content: string;
        };
        foreground: {
            base: string;
            content: string;
        };
        primary: {
            base: string;
            content: string;
        };
        secondary: {
            base: string;
            content: string;
        };
        success: {
            base: string;
            content: string;
        };
        warning: {
            base: string;
            content: string;
        };
        danger: {
            base: string;
            content: string;
        };
    };
    radius: {
        none: {
            content: string;
        };
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
        full: {
            content: string;
        };
    };
    shadow: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    backdrop: {
        transparent: {};
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    triggerScaleOnOpen: {
        true: {
            trigger: string[];
        };
        false: {};
    };
    disableAnimation: {
        true: {
            base: string;
        };
    };
    isTriggerDisabled: {
        true: {
            trigger: string;
        };
        false: {};
    };
}, {
    base: string[];
    content: string[];
    trigger: string[];
    backdrop: string[];
    arrow: never[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    size: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    color: {
        default: {
            base: string;
            content: string;
        };
        foreground: {
            base: string;
            content: string;
        };
        primary: {
            base: string;
            content: string;
        };
        secondary: {
            base: string;
            content: string;
        };
        success: {
            base: string;
            content: string;
        };
        warning: {
            base: string;
            content: string;
        };
        danger: {
            base: string;
            content: string;
        };
    };
    radius: {
        none: {
            content: string;
        };
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
        full: {
            content: string;
        };
    };
    shadow: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    backdrop: {
        transparent: {};
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    triggerScaleOnOpen: {
        true: {
            trigger: string[];
        };
        false: {};
    };
    disableAnimation: {
        true: {
            base: string;
        };
    };
    isTriggerDisabled: {
        true: {
            trigger: string;
        };
        false: {};
    };
}, {
    size: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    color: {
        default: {
            base: string;
            content: string;
        };
        foreground: {
            base: string;
            content: string;
        };
        primary: {
            base: string;
            content: string;
        };
        secondary: {
            base: string;
            content: string;
        };
        success: {
            base: string;
            content: string;
        };
        warning: {
            base: string;
            content: string;
        };
        danger: {
            base: string;
            content: string;
        };
    };
    radius: {
        none: {
            content: string;
        };
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
        full: {
            content: string;
        };
    };
    shadow: {
        sm: {
            content: string;
        };
        md: {
            content: string;
        };
        lg: {
            content: string;
        };
    };
    backdrop: {
        transparent: {};
        opaque: {
            backdrop: string;
        };
        blur: {
            backdrop: string;
        };
    };
    triggerScaleOnOpen: {
        true: {
            trigger: string[];
        };
        false: {};
    };
    disableAnimation: {
        true: {
            base: string;
        };
    };
    isTriggerDisabled: {
        true: {
            trigger: string;
        };
        false: {};
    };
}>, unknown, unknown, undefined>>;
type PopoverVariantProps = VariantProps<typeof popover>;
type PopoverSlots = keyof ReturnType<typeof popover>;

export { PopoverSlots, PopoverVariantProps, popover };
