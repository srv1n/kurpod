import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';
import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';

/**
 * Progress **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, labelWrapper, label, value, track, indicator} = progress({...})
 *
 * <div className={base()} aria-label="progress" role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
 *   <div className={labelWrapper()}>
 *      <span className={label()}>{label}</span>
 *      <span className={value()}>{value}</span>
 *   </div>
 *   <div className={track()}>
 *     <div className={indicator()} style={{width: `${value}%`}} />
 *   </div>
 * </div>
 * ```
 */
declare const progress: tailwind_variants.TVReturnType<{
    color: {
        default: {
            indicator: string;
        };
        primary: {
            indicator: string;
        };
        secondary: {
            indicator: string;
        };
        success: {
            indicator: string;
        };
        warning: {
            indicator: string;
        };
        danger: {
            indicator: string;
        };
    };
    size: {
        sm: {
            label: string;
            value: string;
            track: string;
        };
        md: {
            label: string;
            value: string;
            track: string;
        };
        lg: {
            label: string;
            value: string;
            track: string;
        };
    };
    radius: {
        none: {
            track: string;
            indicator: string;
        };
        sm: {
            track: string;
            indicator: string;
        };
        md: {
            track: string;
            indicator: string;
        };
        lg: {
            track: string;
            indicator: string;
        };
        full: {
            track: string;
            indicator: string;
        };
    };
    isStriped: {
        true: {
            indicator: string;
        };
    };
    isIndeterminate: {
        true: {
            indicator: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    label: string;
    labelWrapper: string;
    value: string;
    track: string;
    indicator: string;
}, undefined, {
    twMerge: true;
}, {
    color: {
        default: {
            indicator: string;
        };
        primary: {
            indicator: string;
        };
        secondary: {
            indicator: string;
        };
        success: {
            indicator: string;
        };
        warning: {
            indicator: string;
        };
        danger: {
            indicator: string;
        };
    };
    size: {
        sm: {
            label: string;
            value: string;
            track: string;
        };
        md: {
            label: string;
            value: string;
            track: string;
        };
        lg: {
            label: string;
            value: string;
            track: string;
        };
    };
    radius: {
        none: {
            track: string;
            indicator: string;
        };
        sm: {
            track: string;
            indicator: string;
        };
        md: {
            track: string;
            indicator: string;
        };
        lg: {
            track: string;
            indicator: string;
        };
        full: {
            track: string;
            indicator: string;
        };
    };
    isStriped: {
        true: {
            indicator: string;
        };
    };
    isIndeterminate: {
        true: {
            indicator: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    label: string;
    labelWrapper: string;
    value: string;
    track: string;
    indicator: string;
}, tailwind_variants.TVReturnType<{
    color: {
        default: {
            indicator: string;
        };
        primary: {
            indicator: string;
        };
        secondary: {
            indicator: string;
        };
        success: {
            indicator: string;
        };
        warning: {
            indicator: string;
        };
        danger: {
            indicator: string;
        };
    };
    size: {
        sm: {
            label: string;
            value: string;
            track: string;
        };
        md: {
            label: string;
            value: string;
            track: string;
        };
        lg: {
            label: string;
            value: string;
            track: string;
        };
    };
    radius: {
        none: {
            track: string;
            indicator: string;
        };
        sm: {
            track: string;
            indicator: string;
        };
        md: {
            track: string;
            indicator: string;
        };
        lg: {
            track: string;
            indicator: string;
        };
        full: {
            track: string;
            indicator: string;
        };
    };
    isStriped: {
        true: {
            indicator: string;
        };
    };
    isIndeterminate: {
        true: {
            indicator: string[];
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    label: string;
    labelWrapper: string;
    value: string;
    track: string;
    indicator: string;
}, undefined, {
    twMerge: true;
}, unknown, unknown, undefined>>;
/**
 * CircularProgress **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, svgWrapper, svg, indicator, value, label} = circularProgress({...})
 *
 * <div className={base()} aria-label="progress" role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
 *   <div className={svgWrapper()}>
 *      <svg className={svg()}>
 *        <circle className={track()} />
 *        <circle className={indicator()} />
 *      </svg>
 *      <span className={value()}>{value}</span>
 *   </div>
 *    <span className={label()}>{label}</span>
 * </div>
 * ```
 */
declare const circularProgress: tailwind_variants.TVReturnType<{
    color: {
        default: {
            svg: string;
        };
        primary: {
            svg: string;
        };
        secondary: {
            svg: string;
        };
        success: {
            svg: string;
        };
        warning: {
            svg: string;
        };
        danger: {
            svg: string;
        };
    };
    size: {
        sm: {
            svg: string;
            label: string;
            value: string;
        };
        md: {
            svg: string;
            label: string;
            value: string;
        };
        lg: {
            svg: string;
            label: string;
            value: string;
        };
    };
    isIndeterminate: {
        true: {
            svg: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    label: string;
    svgWrapper: string;
    svg: string;
    track: string;
    indicator: string;
    value: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    color: {
        default: {
            svg: string;
        };
        primary: {
            svg: string;
        };
        secondary: {
            svg: string;
        };
        success: {
            svg: string;
        };
        warning: {
            svg: string;
        };
        danger: {
            svg: string;
        };
    };
    size: {
        sm: {
            svg: string;
            label: string;
            value: string;
        };
        md: {
            svg: string;
            label: string;
            value: string;
        };
        lg: {
            svg: string;
            label: string;
            value: string;
        };
    };
    isIndeterminate: {
        true: {
            svg: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    color: {
        default: {
            svg: string;
        };
        primary: {
            svg: string;
        };
        secondary: {
            svg: string;
        };
        success: {
            svg: string;
        };
        warning: {
            svg: string;
        };
        danger: {
            svg: string;
        };
    };
    size: {
        sm: {
            svg: string;
            label: string;
            value: string;
        };
        md: {
            svg: string;
            label: string;
            value: string;
        };
        lg: {
            svg: string;
            label: string;
            value: string;
        };
    };
    isIndeterminate: {
        true: {
            svg: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}>, {
    color: {
        default: {
            svg: string;
        };
        primary: {
            svg: string;
        };
        secondary: {
            svg: string;
        };
        success: {
            svg: string;
        };
        warning: {
            svg: string;
        };
        danger: {
            svg: string;
        };
    };
    size: {
        sm: {
            svg: string;
            label: string;
            value: string;
        };
        md: {
            svg: string;
            label: string;
            value: string;
        };
        lg: {
            svg: string;
            label: string;
            value: string;
        };
    };
    isIndeterminate: {
        true: {
            svg: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    label: string;
    svgWrapper: string;
    svg: string;
    track: string;
    indicator: string;
    value: string;
}, tailwind_variants.TVReturnType<{
    color: {
        default: {
            svg: string;
        };
        primary: {
            svg: string;
        };
        secondary: {
            svg: string;
        };
        success: {
            svg: string;
        };
        warning: {
            svg: string;
        };
        danger: {
            svg: string;
        };
    };
    size: {
        sm: {
            svg: string;
            label: string;
            value: string;
        };
        md: {
            svg: string;
            label: string;
            value: string;
        };
        lg: {
            svg: string;
            label: string;
            value: string;
        };
    };
    isIndeterminate: {
        true: {
            svg: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    base: string;
    label: string;
    svgWrapper: string;
    svg: string;
    track: string;
    indicator: string;
    value: string;
}, undefined, tailwind_variants_dist_config.TVConfig<{
    color: {
        default: {
            svg: string;
        };
        primary: {
            svg: string;
        };
        secondary: {
            svg: string;
        };
        success: {
            svg: string;
        };
        warning: {
            svg: string;
        };
        danger: {
            svg: string;
        };
    };
    size: {
        sm: {
            svg: string;
            label: string;
            value: string;
        };
        md: {
            svg: string;
            label: string;
            value: string;
        };
        lg: {
            svg: string;
            label: string;
            value: string;
        };
    };
    isIndeterminate: {
        true: {
            svg: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}, {
    color: {
        default: {
            svg: string;
        };
        primary: {
            svg: string;
        };
        secondary: {
            svg: string;
        };
        success: {
            svg: string;
        };
        warning: {
            svg: string;
        };
        danger: {
            svg: string;
        };
    };
    size: {
        sm: {
            svg: string;
            label: string;
            value: string;
        };
        md: {
            svg: string;
            label: string;
            value: string;
        };
        lg: {
            svg: string;
            label: string;
            value: string;
        };
    };
    isIndeterminate: {
        true: {
            svg: string;
        };
    };
    isDisabled: {
        true: {
            base: string;
        };
    };
    disableAnimation: {
        true: {};
        false: {
            indicator: string;
        };
    };
}>, unknown, unknown, undefined>>;
type ProgressVariantProps = VariantProps<typeof progress>;
type ProgressSlots = keyof ReturnType<typeof progress>;
type CircularProgressVariantProps = VariantProps<typeof circularProgress>;
type CircularProgressSlots = keyof ReturnType<typeof circularProgress>;

export { CircularProgressSlots, CircularProgressVariantProps, ProgressSlots, ProgressVariantProps, circularProgress, progress };
