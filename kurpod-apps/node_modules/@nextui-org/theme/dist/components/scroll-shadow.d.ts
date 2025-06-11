import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * ScrollShadow wrapper **Tailwind Variants** component
 *
 * const classNames = scrollShadow({...})
 *
 * @example
 * <div className={classNames)}>
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *   ...
 * </div>
 */
declare const scrollShadow: tailwind_variants.TVReturnType<{
    orientation: {
        vertical: string[];
        horizontal: string[];
    };
    hideScrollBar: {
        true: "scrollbar-hide";
        false: "";
    };
}, undefined, never[], tailwind_variants_dist_config.TVConfig<{
    orientation: {
        vertical: string[];
        horizontal: string[];
    };
    hideScrollBar: {
        true: "scrollbar-hide";
        false: "";
    };
}, {
    orientation: {
        vertical: string[];
        horizontal: string[];
    };
    hideScrollBar: {
        true: "scrollbar-hide";
        false: "";
    };
}>, {
    orientation: {
        vertical: string[];
        horizontal: string[];
    };
    hideScrollBar: {
        true: "scrollbar-hide";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnType<{
    orientation: {
        vertical: string[];
        horizontal: string[];
    };
    hideScrollBar: {
        true: "scrollbar-hide";
        false: "";
    };
}, undefined, never[], tailwind_variants_dist_config.TVConfig<{
    orientation: {
        vertical: string[];
        horizontal: string[];
    };
    hideScrollBar: {
        true: "scrollbar-hide";
        false: "";
    };
}, {
    orientation: {
        vertical: string[];
        horizontal: string[];
    };
    hideScrollBar: {
        true: "scrollbar-hide";
        false: "";
    };
}>, unknown, unknown, undefined>>;
type ScrollShadowVariantProps = VariantProps<typeof scrollShadow>;

export { ScrollShadowVariantProps, scrollShadow };
