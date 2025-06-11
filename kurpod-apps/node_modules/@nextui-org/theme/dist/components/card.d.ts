import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, header, body, footer} = card({...})
 *
 * <div className={base()}>
 *    <div className={header()}>Header</div>
 *    <div className={body()}>Body</div>
 *    <div className={footer()}>Footer</div>
 * </div>
 * ```
 */
declare const card: tailwind_variants.TVReturnType<{
    shadow: {
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
    };
    radius: {
        none: {
            base: string;
            header: string;
            footer: string;
        };
        sm: {
            base: string;
            header: string;
            footer: string;
        };
        md: {
            base: string;
            header: string;
            footer: string;
        };
        lg: {
            base: string;
            header: string;
            footer: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
    };
    isHoverable: {
        true: {
            base: string;
        };
    };
    isPressable: {
        true: {
            base: string;
        };
    };
    isBlurred: {
        true: {
            base: string[];
        };
    };
    isFooterBlurred: {
        true: {
            footer: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: "";
        false: {
            base: string;
        };
    };
}, {
    base: string[];
    header: string[];
    body: string[];
    footer: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    shadow: {
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
    };
    radius: {
        none: {
            base: string;
            header: string;
            footer: string;
        };
        sm: {
            base: string;
            header: string;
            footer: string;
        };
        md: {
            base: string;
            header: string;
            footer: string;
        };
        lg: {
            base: string;
            header: string;
            footer: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
    };
    isHoverable: {
        true: {
            base: string;
        };
    };
    isPressable: {
        true: {
            base: string;
        };
    };
    isBlurred: {
        true: {
            base: string[];
        };
    };
    isFooterBlurred: {
        true: {
            footer: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: "";
        false: {
            base: string;
        };
    };
}, {
    shadow: {
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
    };
    radius: {
        none: {
            base: string;
            header: string;
            footer: string;
        };
        sm: {
            base: string;
            header: string;
            footer: string;
        };
        md: {
            base: string;
            header: string;
            footer: string;
        };
        lg: {
            base: string;
            header: string;
            footer: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
    };
    isHoverable: {
        true: {
            base: string;
        };
    };
    isPressable: {
        true: {
            base: string;
        };
    };
    isBlurred: {
        true: {
            base: string[];
        };
    };
    isFooterBlurred: {
        true: {
            footer: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: "";
        false: {
            base: string;
        };
    };
}>, {
    shadow: {
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
    };
    radius: {
        none: {
            base: string;
            header: string;
            footer: string;
        };
        sm: {
            base: string;
            header: string;
            footer: string;
        };
        md: {
            base: string;
            header: string;
            footer: string;
        };
        lg: {
            base: string;
            header: string;
            footer: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
    };
    isHoverable: {
        true: {
            base: string;
        };
    };
    isPressable: {
        true: {
            base: string;
        };
    };
    isBlurred: {
        true: {
            base: string[];
        };
    };
    isFooterBlurred: {
        true: {
            footer: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: "";
        false: {
            base: string;
        };
    };
}, {
    base: string[];
    header: string[];
    body: string[];
    footer: string[];
}, tailwind_variants.TVReturnType<{
    shadow: {
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
    };
    radius: {
        none: {
            base: string;
            header: string;
            footer: string;
        };
        sm: {
            base: string;
            header: string;
            footer: string;
        };
        md: {
            base: string;
            header: string;
            footer: string;
        };
        lg: {
            base: string;
            header: string;
            footer: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
    };
    isHoverable: {
        true: {
            base: string;
        };
    };
    isPressable: {
        true: {
            base: string;
        };
    };
    isBlurred: {
        true: {
            base: string[];
        };
    };
    isFooterBlurred: {
        true: {
            footer: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: "";
        false: {
            base: string;
        };
    };
}, {
    base: string[];
    header: string[];
    body: string[];
    footer: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    shadow: {
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
    };
    radius: {
        none: {
            base: string;
            header: string;
            footer: string;
        };
        sm: {
            base: string;
            header: string;
            footer: string;
        };
        md: {
            base: string;
            header: string;
            footer: string;
        };
        lg: {
            base: string;
            header: string;
            footer: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
    };
    isHoverable: {
        true: {
            base: string;
        };
    };
    isPressable: {
        true: {
            base: string;
        };
    };
    isBlurred: {
        true: {
            base: string[];
        };
    };
    isFooterBlurred: {
        true: {
            footer: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: "";
        false: {
            base: string;
        };
    };
}, {
    shadow: {
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
    };
    radius: {
        none: {
            base: string;
            header: string;
            footer: string;
        };
        sm: {
            base: string;
            header: string;
            footer: string;
        };
        md: {
            base: string;
            header: string;
            footer: string;
        };
        lg: {
            base: string;
            header: string;
            footer: string;
        };
    };
    fullWidth: {
        true: {
            base: string;
        };
    };
    isHoverable: {
        true: {
            base: string;
        };
    };
    isPressable: {
        true: {
            base: string;
        };
    };
    isBlurred: {
        true: {
            base: string[];
        };
    };
    isFooterBlurred: {
        true: {
            footer: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: "";
        false: {
            base: string;
        };
    };
}>, unknown, unknown, undefined>>;
type CardVariantProps = VariantProps<typeof card>;
type CardSlots = keyof ReturnType<typeof card>;
type CardReturnType = ReturnType<typeof card>;

export { CardReturnType, CardSlots, CardVariantProps, card };
