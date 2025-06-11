import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Image wrapper **Tailwind Variants** component
 *
 * const {img, wrapper, blurredImg, zoomedWrapper} = image({...})
 *
 * @example
 * <div className={wrapper()}>
 *    <img alt="image" className={img())} src="https://..." />
 *      // wrap the image if you want to zoom it
 *      <div className={zoomedWrapper()}>
 *       <img alt="image" className={img())} src="https://..." />
 *     </div>
 *    // duplicate it for the blur effect
 *    <img alt="image" className={blurredImg())} src="https://..." />
 * </div>
 */
declare const image: tailwind_variants.TVReturnType<{
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    shadow: {
        none: {
            wrapper: string;
            img: string;
        };
        sm: {
            wrapper: string;
            img: string;
        };
        md: {
            wrapper: string;
            img: string;
        };
        lg: {
            wrapper: string;
            img: string;
        };
    };
    isZoomed: {
        true: {
            img: string[];
        };
    };
    showSkeleton: {
        true: {
            wrapper: string[];
            img: string;
        };
    };
    disableAnimation: {
        true: {
            img: string;
        };
        false: {
            img: string;
        };
    };
}, {
    wrapper: string;
    zoomedWrapper: string;
    img: string;
    blurredImg: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    shadow: {
        none: {
            wrapper: string;
            img: string;
        };
        sm: {
            wrapper: string;
            img: string;
        };
        md: {
            wrapper: string;
            img: string;
        };
        lg: {
            wrapper: string;
            img: string;
        };
    };
    isZoomed: {
        true: {
            img: string[];
        };
    };
    showSkeleton: {
        true: {
            wrapper: string[];
            img: string;
        };
    };
    disableAnimation: {
        true: {
            img: string;
        };
        false: {
            img: string;
        };
    };
}, {
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    shadow: {
        none: {
            wrapper: string;
            img: string;
        };
        sm: {
            wrapper: string;
            img: string;
        };
        md: {
            wrapper: string;
            img: string;
        };
        lg: {
            wrapper: string;
            img: string;
        };
    };
    isZoomed: {
        true: {
            img: string[];
        };
    };
    showSkeleton: {
        true: {
            wrapper: string[];
            img: string;
        };
    };
    disableAnimation: {
        true: {
            img: string;
        };
        false: {
            img: string;
        };
    };
}>, {
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    shadow: {
        none: {
            wrapper: string;
            img: string;
        };
        sm: {
            wrapper: string;
            img: string;
        };
        md: {
            wrapper: string;
            img: string;
        };
        lg: {
            wrapper: string;
            img: string;
        };
    };
    isZoomed: {
        true: {
            img: string[];
        };
    };
    showSkeleton: {
        true: {
            wrapper: string[];
            img: string;
        };
    };
    disableAnimation: {
        true: {
            img: string;
        };
        false: {
            img: string;
        };
    };
}, {
    wrapper: string;
    zoomedWrapper: string;
    img: string;
    blurredImg: string[];
}, tailwind_variants.TVReturnType<{
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    shadow: {
        none: {
            wrapper: string;
            img: string;
        };
        sm: {
            wrapper: string;
            img: string;
        };
        md: {
            wrapper: string;
            img: string;
        };
        lg: {
            wrapper: string;
            img: string;
        };
    };
    isZoomed: {
        true: {
            img: string[];
        };
    };
    showSkeleton: {
        true: {
            wrapper: string[];
            img: string;
        };
    };
    disableAnimation: {
        true: {
            img: string;
        };
        false: {
            img: string;
        };
    };
}, {
    wrapper: string;
    zoomedWrapper: string;
    img: string;
    blurredImg: string[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    shadow: {
        none: {
            wrapper: string;
            img: string;
        };
        sm: {
            wrapper: string;
            img: string;
        };
        md: {
            wrapper: string;
            img: string;
        };
        lg: {
            wrapper: string;
            img: string;
        };
    };
    isZoomed: {
        true: {
            img: string[];
        };
    };
    showSkeleton: {
        true: {
            wrapper: string[];
            img: string;
        };
    };
    disableAnimation: {
        true: {
            img: string;
        };
        false: {
            img: string;
        };
    };
}, {
    radius: {
        none: {};
        sm: {};
        md: {};
        lg: {};
        full: {};
    };
    shadow: {
        none: {
            wrapper: string;
            img: string;
        };
        sm: {
            wrapper: string;
            img: string;
        };
        md: {
            wrapper: string;
            img: string;
        };
        lg: {
            wrapper: string;
            img: string;
        };
    };
    isZoomed: {
        true: {
            img: string[];
        };
    };
    showSkeleton: {
        true: {
            wrapper: string[];
            img: string;
        };
    };
    disableAnimation: {
        true: {
            img: string;
        };
        false: {
            img: string;
        };
    };
}>, unknown, unknown, undefined>>;
type ImageVariantProps = VariantProps<typeof image>;
type ImageSlots = keyof ReturnType<typeof image>;

export { ImageSlots, ImageVariantProps, image };
