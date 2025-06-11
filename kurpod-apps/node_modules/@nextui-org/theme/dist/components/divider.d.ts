import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Divider wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const styles = divider()
 *
 * <span className={styles} />
 */
declare const divider: tailwind_variants.TVReturnType<{
    orientation: {
        horizontal: "w-full h-divider";
        vertical: "h-full w-divider";
    };
}, undefined, "shrink-0 bg-divider border-none", tailwind_variants_dist_config.TVConfig<{
    orientation: {
        horizontal: "w-full h-divider";
        vertical: "h-full w-divider";
    };
}, {
    orientation: {
        horizontal: "w-full h-divider";
        vertical: "h-full w-divider";
    };
}>, {
    orientation: {
        horizontal: "w-full h-divider";
        vertical: "h-full w-divider";
    };
}, undefined, tailwind_variants.TVReturnType<{
    orientation: {
        horizontal: "w-full h-divider";
        vertical: "h-full w-divider";
    };
}, undefined, "shrink-0 bg-divider border-none", tailwind_variants_dist_config.TVConfig<{
    orientation: {
        horizontal: "w-full h-divider";
        vertical: "h-full w-divider";
    };
}, {
    orientation: {
        horizontal: "w-full h-divider";
        vertical: "h-full w-divider";
    };
}>, unknown, unknown, undefined>>;
type DividerVariantProps = VariantProps<typeof divider>;

export { DividerVariantProps, divider };
