import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Skeleton wrapper **Tailwind Variants** component
 *
 * const styles = skeleton({...})
 *
 * @example
 * <div className={styles()}>
 *   // skeleton content
 * </div>
 */
declare const skeleton: tailwind_variants.TVReturnType<{
    disableAnimation: {
        true: {
            base: string;
            content: string;
        };
        false: {
            base: string;
            content: string;
        };
    };
}, {
    base: string[];
    content: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    disableAnimation: {
        true: {
            base: string;
            content: string;
        };
        false: {
            base: string;
            content: string;
        };
    };
}, {
    disableAnimation: {
        true: {
            base: string;
            content: string;
        };
        false: {
            base: string;
            content: string;
        };
    };
}>, {
    disableAnimation: {
        true: {
            base: string;
            content: string;
        };
        false: {
            base: string;
            content: string;
        };
    };
}, {
    base: string[];
    content: string[];
}, tailwind_variants.TVReturnType<{
    disableAnimation: {
        true: {
            base: string;
            content: string;
        };
        false: {
            base: string;
            content: string;
        };
    };
}, {
    base: string[];
    content: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    disableAnimation: {
        true: {
            base: string;
            content: string;
        };
        false: {
            base: string;
            content: string;
        };
    };
}, {
    disableAnimation: {
        true: {
            base: string;
            content: string;
        };
        false: {
            base: string;
            content: string;
        };
    };
}>, unknown, unknown, undefined>>;
type SkeletonVariantProps = VariantProps<typeof skeleton>;
type SkeletonSlots = keyof ReturnType<typeof skeleton>;

export { SkeletonSlots, SkeletonVariantProps, skeleton };
