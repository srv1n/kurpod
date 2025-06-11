import * as tailwind_variants from 'tailwind-variants';
import { VariantProps } from 'tailwind-variants';
import * as tailwind_variants_dist_config from 'tailwind-variants/dist/config';

/**
 * Slider wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const slots = slider()
 *
 * <div className={slots.base()}>
 *  <div className={slots.labelWrapper()}>
 *    <label className={slots.label()}>Label</label>
 *    <output className={slots.value()} />
 *  </div>
 *  <div className={slots.trackWrapper()}>
 *      <div className={slots.startContent()}>Start Content</div>
 *      <div className={slots.track()}>
 *         <div className={slots.filler()} />
 *         <div className={slots.step()} />
 *         <div className={slots.thumb()} />
 *         <div className={slots.mark()}>Mark</div>
 *      </div>
 *     <div className={slots.endContent()}>End Content</div>
 *   </div>
 * </div>
 */
declare const slider: tailwind_variants.TVReturnType<{
    size: {
        sm: {
            label: string;
            value: string;
            thumb: string;
            step: string;
        };
        md: {
            thumb: string;
            label: string;
            value: string;
        };
        lg: {
            thumb: string;
            step: string;
            label: string;
            value: string;
            mark: string;
        };
    };
    radius: {
        none: {
            thumb: string;
        };
        sm: {
            thumb: string;
        };
        md: {
            thumb: string;
        };
        lg: {
            thumb: string;
        };
        full: {
            thumb: string;
        };
    };
    color: {
        foreground: {
            filler: string;
            thumb: string;
        };
        primary: {
            filler: string;
            thumb: string;
        };
        secondary: {
            filler: string;
            thumb: string;
        };
        success: {
            filler: string;
            thumb: string;
        };
        warning: {
            filler: string;
            thumb: string;
        };
        danger: {
            filler: string;
            thumb: string;
        };
    };
    isVertical: {
        true: {
            base: string;
            trackWrapper: string;
            filler: string;
            thumb: string;
            track: string;
            labelWrapper: string;
            step: string[];
            mark: string[];
        };
        false: {
            thumb: string;
            trackWrapper: string;
            track: string;
            step: string[];
            mark: string[];
        };
    };
    isDisabled: {
        false: {
            thumb: string[];
        };
        true: {
            base: string;
            thumb: string;
        };
    };
    hasMarks: {
        true: {
            base: string;
            mark: string;
        };
        false: {};
    };
    showOutline: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
        };
    };
    hideValue: {
        true: {
            value: string;
        };
    };
    hideThumb: {
        true: {
            thumb: string;
            track: string;
        };
    };
    hasSingleThumb: {
        true: {};
        false: {};
    };
    disableAnimation: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
            mark: string;
        };
    };
    disableThumbScale: {
        true: {};
        false: {
            thumb: string;
        };
    };
}, {
    base: string;
    labelWrapper: string;
    label: string;
    value: string;
    step: string[];
    mark: string[];
    trackWrapper: string;
    track: string[];
    filler: string;
    thumb: (string | string[])[];
    startContent: never[];
    endContent: never[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    size: {
        sm: {
            label: string;
            value: string;
            thumb: string;
            step: string;
        };
        md: {
            thumb: string;
            label: string;
            value: string;
        };
        lg: {
            thumb: string;
            step: string;
            label: string;
            value: string;
            mark: string;
        };
    };
    radius: {
        none: {
            thumb: string;
        };
        sm: {
            thumb: string;
        };
        md: {
            thumb: string;
        };
        lg: {
            thumb: string;
        };
        full: {
            thumb: string;
        };
    };
    color: {
        foreground: {
            filler: string;
            thumb: string;
        };
        primary: {
            filler: string;
            thumb: string;
        };
        secondary: {
            filler: string;
            thumb: string;
        };
        success: {
            filler: string;
            thumb: string;
        };
        warning: {
            filler: string;
            thumb: string;
        };
        danger: {
            filler: string;
            thumb: string;
        };
    };
    isVertical: {
        true: {
            base: string;
            trackWrapper: string;
            filler: string;
            thumb: string;
            track: string;
            labelWrapper: string;
            step: string[];
            mark: string[];
        };
        false: {
            thumb: string;
            trackWrapper: string;
            track: string;
            step: string[];
            mark: string[];
        };
    };
    isDisabled: {
        false: {
            thumb: string[];
        };
        true: {
            base: string;
            thumb: string;
        };
    };
    hasMarks: {
        true: {
            base: string;
            mark: string;
        };
        false: {};
    };
    showOutline: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
        };
    };
    hideValue: {
        true: {
            value: string;
        };
    };
    hideThumb: {
        true: {
            thumb: string;
            track: string;
        };
    };
    hasSingleThumb: {
        true: {};
        false: {};
    };
    disableAnimation: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
            mark: string;
        };
    };
    disableThumbScale: {
        true: {};
        false: {
            thumb: string;
        };
    };
}, {
    size: {
        sm: {
            label: string;
            value: string;
            thumb: string;
            step: string;
        };
        md: {
            thumb: string;
            label: string;
            value: string;
        };
        lg: {
            thumb: string;
            step: string;
            label: string;
            value: string;
            mark: string;
        };
    };
    radius: {
        none: {
            thumb: string;
        };
        sm: {
            thumb: string;
        };
        md: {
            thumb: string;
        };
        lg: {
            thumb: string;
        };
        full: {
            thumb: string;
        };
    };
    color: {
        foreground: {
            filler: string;
            thumb: string;
        };
        primary: {
            filler: string;
            thumb: string;
        };
        secondary: {
            filler: string;
            thumb: string;
        };
        success: {
            filler: string;
            thumb: string;
        };
        warning: {
            filler: string;
            thumb: string;
        };
        danger: {
            filler: string;
            thumb: string;
        };
    };
    isVertical: {
        true: {
            base: string;
            trackWrapper: string;
            filler: string;
            thumb: string;
            track: string;
            labelWrapper: string;
            step: string[];
            mark: string[];
        };
        false: {
            thumb: string;
            trackWrapper: string;
            track: string;
            step: string[];
            mark: string[];
        };
    };
    isDisabled: {
        false: {
            thumb: string[];
        };
        true: {
            base: string;
            thumb: string;
        };
    };
    hasMarks: {
        true: {
            base: string;
            mark: string;
        };
        false: {};
    };
    showOutline: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
        };
    };
    hideValue: {
        true: {
            value: string;
        };
    };
    hideThumb: {
        true: {
            thumb: string;
            track: string;
        };
    };
    hasSingleThumb: {
        true: {};
        false: {};
    };
    disableAnimation: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
            mark: string;
        };
    };
    disableThumbScale: {
        true: {};
        false: {
            thumb: string;
        };
    };
}>, {
    size: {
        sm: {
            label: string;
            value: string;
            thumb: string;
            step: string;
        };
        md: {
            thumb: string;
            label: string;
            value: string;
        };
        lg: {
            thumb: string;
            step: string;
            label: string;
            value: string;
            mark: string;
        };
    };
    radius: {
        none: {
            thumb: string;
        };
        sm: {
            thumb: string;
        };
        md: {
            thumb: string;
        };
        lg: {
            thumb: string;
        };
        full: {
            thumb: string;
        };
    };
    color: {
        foreground: {
            filler: string;
            thumb: string;
        };
        primary: {
            filler: string;
            thumb: string;
        };
        secondary: {
            filler: string;
            thumb: string;
        };
        success: {
            filler: string;
            thumb: string;
        };
        warning: {
            filler: string;
            thumb: string;
        };
        danger: {
            filler: string;
            thumb: string;
        };
    };
    isVertical: {
        true: {
            base: string;
            trackWrapper: string;
            filler: string;
            thumb: string;
            track: string;
            labelWrapper: string;
            step: string[];
            mark: string[];
        };
        false: {
            thumb: string;
            trackWrapper: string;
            track: string;
            step: string[];
            mark: string[];
        };
    };
    isDisabled: {
        false: {
            thumb: string[];
        };
        true: {
            base: string;
            thumb: string;
        };
    };
    hasMarks: {
        true: {
            base: string;
            mark: string;
        };
        false: {};
    };
    showOutline: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
        };
    };
    hideValue: {
        true: {
            value: string;
        };
    };
    hideThumb: {
        true: {
            thumb: string;
            track: string;
        };
    };
    hasSingleThumb: {
        true: {};
        false: {};
    };
    disableAnimation: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
            mark: string;
        };
    };
    disableThumbScale: {
        true: {};
        false: {
            thumb: string;
        };
    };
}, {
    base: string;
    labelWrapper: string;
    label: string;
    value: string;
    step: string[];
    mark: string[];
    trackWrapper: string;
    track: string[];
    filler: string;
    thumb: (string | string[])[];
    startContent: never[];
    endContent: never[];
}, tailwind_variants.TVReturnType<{
    size: {
        sm: {
            label: string;
            value: string;
            thumb: string;
            step: string;
        };
        md: {
            thumb: string;
            label: string;
            value: string;
        };
        lg: {
            thumb: string;
            step: string;
            label: string;
            value: string;
            mark: string;
        };
    };
    radius: {
        none: {
            thumb: string;
        };
        sm: {
            thumb: string;
        };
        md: {
            thumb: string;
        };
        lg: {
            thumb: string;
        };
        full: {
            thumb: string;
        };
    };
    color: {
        foreground: {
            filler: string;
            thumb: string;
        };
        primary: {
            filler: string;
            thumb: string;
        };
        secondary: {
            filler: string;
            thumb: string;
        };
        success: {
            filler: string;
            thumb: string;
        };
        warning: {
            filler: string;
            thumb: string;
        };
        danger: {
            filler: string;
            thumb: string;
        };
    };
    isVertical: {
        true: {
            base: string;
            trackWrapper: string;
            filler: string;
            thumb: string;
            track: string;
            labelWrapper: string;
            step: string[];
            mark: string[];
        };
        false: {
            thumb: string;
            trackWrapper: string;
            track: string;
            step: string[];
            mark: string[];
        };
    };
    isDisabled: {
        false: {
            thumb: string[];
        };
        true: {
            base: string;
            thumb: string;
        };
    };
    hasMarks: {
        true: {
            base: string;
            mark: string;
        };
        false: {};
    };
    showOutline: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
        };
    };
    hideValue: {
        true: {
            value: string;
        };
    };
    hideThumb: {
        true: {
            thumb: string;
            track: string;
        };
    };
    hasSingleThumb: {
        true: {};
        false: {};
    };
    disableAnimation: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
            mark: string;
        };
    };
    disableThumbScale: {
        true: {};
        false: {
            thumb: string;
        };
    };
}, {
    base: string;
    labelWrapper: string;
    label: string;
    value: string;
    step: string[];
    mark: string[];
    trackWrapper: string;
    track: string[];
    filler: string;
    thumb: (string | string[])[];
    startContent: never[];
    endContent: never[];
}, undefined, tailwind_variants_dist_config.TVConfig<{
    size: {
        sm: {
            label: string;
            value: string;
            thumb: string;
            step: string;
        };
        md: {
            thumb: string;
            label: string;
            value: string;
        };
        lg: {
            thumb: string;
            step: string;
            label: string;
            value: string;
            mark: string;
        };
    };
    radius: {
        none: {
            thumb: string;
        };
        sm: {
            thumb: string;
        };
        md: {
            thumb: string;
        };
        lg: {
            thumb: string;
        };
        full: {
            thumb: string;
        };
    };
    color: {
        foreground: {
            filler: string;
            thumb: string;
        };
        primary: {
            filler: string;
            thumb: string;
        };
        secondary: {
            filler: string;
            thumb: string;
        };
        success: {
            filler: string;
            thumb: string;
        };
        warning: {
            filler: string;
            thumb: string;
        };
        danger: {
            filler: string;
            thumb: string;
        };
    };
    isVertical: {
        true: {
            base: string;
            trackWrapper: string;
            filler: string;
            thumb: string;
            track: string;
            labelWrapper: string;
            step: string[];
            mark: string[];
        };
        false: {
            thumb: string;
            trackWrapper: string;
            track: string;
            step: string[];
            mark: string[];
        };
    };
    isDisabled: {
        false: {
            thumb: string[];
        };
        true: {
            base: string;
            thumb: string;
        };
    };
    hasMarks: {
        true: {
            base: string;
            mark: string;
        };
        false: {};
    };
    showOutline: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
        };
    };
    hideValue: {
        true: {
            value: string;
        };
    };
    hideThumb: {
        true: {
            thumb: string;
            track: string;
        };
    };
    hasSingleThumb: {
        true: {};
        false: {};
    };
    disableAnimation: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
            mark: string;
        };
    };
    disableThumbScale: {
        true: {};
        false: {
            thumb: string;
        };
    };
}, {
    size: {
        sm: {
            label: string;
            value: string;
            thumb: string;
            step: string;
        };
        md: {
            thumb: string;
            label: string;
            value: string;
        };
        lg: {
            thumb: string;
            step: string;
            label: string;
            value: string;
            mark: string;
        };
    };
    radius: {
        none: {
            thumb: string;
        };
        sm: {
            thumb: string;
        };
        md: {
            thumb: string;
        };
        lg: {
            thumb: string;
        };
        full: {
            thumb: string;
        };
    };
    color: {
        foreground: {
            filler: string;
            thumb: string;
        };
        primary: {
            filler: string;
            thumb: string;
        };
        secondary: {
            filler: string;
            thumb: string;
        };
        success: {
            filler: string;
            thumb: string;
        };
        warning: {
            filler: string;
            thumb: string;
        };
        danger: {
            filler: string;
            thumb: string;
        };
    };
    isVertical: {
        true: {
            base: string;
            trackWrapper: string;
            filler: string;
            thumb: string;
            track: string;
            labelWrapper: string;
            step: string[];
            mark: string[];
        };
        false: {
            thumb: string;
            trackWrapper: string;
            track: string;
            step: string[];
            mark: string[];
        };
    };
    isDisabled: {
        false: {
            thumb: string[];
        };
        true: {
            base: string;
            thumb: string;
        };
    };
    hasMarks: {
        true: {
            base: string;
            mark: string;
        };
        false: {};
    };
    showOutline: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
        };
    };
    hideValue: {
        true: {
            value: string;
        };
    };
    hideThumb: {
        true: {
            thumb: string;
            track: string;
        };
    };
    hasSingleThumb: {
        true: {};
        false: {};
    };
    disableAnimation: {
        true: {
            thumb: string;
        };
        false: {
            thumb: string;
            mark: string;
        };
    };
    disableThumbScale: {
        true: {};
        false: {
            thumb: string;
        };
    };
}>, unknown, unknown, undefined>>;
type SliderVariantProps = VariantProps<typeof slider>;
type SliderSlots = keyof ReturnType<typeof slider>;

export { SliderSlots, SliderVariantProps, slider };
