import * as react from 'react';
import { RefObject, ReactNode } from 'react';
import * as _react_stately_slider from '@react-stately/slider';
import { SliderState } from '@react-stately/slider';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps, DOMAttributes } from '@nextui-org/system';
import { SliderVariantProps, SlotsToClasses, SliderSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { AriaSliderThumbProps, AriaSliderProps } from '@react-aria/slider';
import { TooltipProps } from '@nextui-org/tooltip';
import { ValueBase } from '@react-types/shared';

interface Props$1 extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * slider state, created via `useSliderState`.
     */
    state: SliderState;
    /**
     * A ref to the track element.
     */
    trackRef: RefObject<HTMLDivElement>;
    /**
     * @internal
     */
    isVertical: boolean;
    /**
     * @internal
     */
    showTooltip?: boolean;
    /**
     * @internal
     */
    formatOptions?: Intl.NumberFormatOptions;
    /**
     * @internal
     */
    tooltipProps?: UseSliderProps["tooltipProps"];
    /**
     * Function to render the thumb. It can be used to add a tooltip or custom icon.
     */
    renderThumb?: UseSliderProps["renderThumb"];
}
type UseSliderThumbProps = Props$1 & AriaSliderThumbProps & SliderVariantProps;
declare function useSliderThumb(props: UseSliderThumbProps): {
    Component: _nextui_org_system.As<any>;
    index: number | undefined;
    showTooltip: boolean | undefined;
    renderThumb: ((props: SliderRenderThumbProps) => react.ReactNode) | undefined;
    getThumbProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getTooltipProps: () => TooltipProps;
    getInputProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseSliderThumbReturn = ReturnType<typeof useSliderThumb>;

interface SliderThumbProps extends UseSliderThumbProps {
}
declare const SliderThumb: _nextui_org_system.InternalForwardRefRenderFunction<"div", SliderThumbProps, never>;

type SliderValue = number | number[];
type SliderStepMark = {
    value: number;
    label: string;
};
type SliderRenderThumbProps = DOMAttributes<HTMLDivElement> & {
    index?: number;
};
interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The content to display as the label.
     */
    label?: ReactNode;
    /**
     * The input name.
     */
    name?: string;
    /**
     * The offset from which to start the fill.
     */
    fillOffset?: number;
    /**
     * The display format of the value label.
     */
    formatOptions?: Intl.NumberFormatOptions;
    /**
     * The display format of the tooltip value label.
     * @default formatOptions
     */
    tooltipValueFormatOptions?: Intl.NumberFormatOptions;
    /**
     * Whether to show the step indicators.
     * @default false
     */
    showSteps?: boolean;
    /**
     * Whether the thumbs should have a tooltip with the value on hover the slider.
     * @default false
     */
    showTooltip?: boolean;
    /**
     * Custom steps labels.
     * @example [{value: 0, label: "0"}, {value: 50, label: "50"}, {value: 100, label: "100"}]
     * @default []
     */
    marks?: SliderStepMark[];
    /**
     * Element to be rendered in the start side of the slider.
     */
    startContent?: React.ReactNode;
    /**
     * Element to be rendered in the end side of the slider.
     */
    endContent?: React.ReactNode;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Slider classNames={{
     *    base:"base-classes",
     *    step: "step-classes",
     *    labelWrapper: "label-wrapper-classes",
     *    label: "label-classes",
     *    value: "value-classes",
     *    trackWrapper: "track-wrapper-classes",
     *    track: "track-classes",
     *    filler: "filler-classes",
     *    thumb: "thumb-classes",
     *    mark: "mark-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<SliderSlots>;
    /**
     * Tooltip props.
     * @see [Tooltip](https://nextui.org/components/tooltip) for more details.
     * @default {
     *  offset: 15,
     *  delay: 0,
     *  size: "sm",
     *  showArrow: true,
     *  placement: "top", // "right" for vertical slider
     *  content: [sliderValue],
     *  color: sliderProps?.color, // same as the slider color
     *  isDisabled: sliderProps?.isDisabled,
     * }
     */
    tooltipProps?: Partial<TooltipProps>;
    /**
     * A function that returns the content to display as the value label.
     * Overrides default formatted number.
     */
    getValue?: (value: SliderValue) => string;
    /**
     * Function to render the label.
     */
    renderLabel?: (props: DOMAttributes<HTMLLabelElement>) => React.ReactNode;
    /**
     * Function to render the value label.
     */
    renderValue?: (props: DOMAttributes<HTMLOutputElement>) => React.ReactNode;
    /**
     * Function to render the thumb. It can be used to add a tooltip or custom icon.
     */
    renderThumb?: (props: SliderRenderThumbProps) => React.ReactNode;
}
type UseSliderProps = Omit<Props, keyof ValueBase<SliderValue>> & AriaSliderProps & SliderVariantProps;
declare function useSlider(originalProps: UseSliderProps): {
    Component: _nextui_org_system.As<any>;
    state: _react_stately_slider.SliderState;
    value: string;
    domRef: react.RefObject<HTMLElement>;
    label: ReactNode;
    steps: number;
    marks: SliderStepMark[];
    startContent: ReactNode;
    endContent: ReactNode;
    getStepProps: (index: number) => {
        className: string;
        "data-slot": string;
        "data-in-range": boolean;
        style: {
            [x: string]: string;
        };
    };
    getBaseProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getValue: ((value: SliderValue) => string) | undefined;
    renderLabel: ((props: DOMAttributes<HTMLLabelElement>) => ReactNode) | undefined;
    renderValue: ((props: DOMAttributes<HTMLOutputElement>) => ReactNode) | undefined;
    getTrackWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getValueProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getTrackProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getFillerProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getThumbProps: (index: number) => SliderThumbProps;
    getMarkProps: (mark: SliderStepMark) => {
        className: string;
        "data-slot": string;
        "data-in-range": boolean;
        style: {
            [x: string]: string;
        };
        onMouseDown: (e: React.MouseEvent) => void;
        onPointerDown: (e: React.PointerEvent) => void;
        onClick: (e: any) => void;
    };
    getStartContentProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getEndContentProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseSliderReturn = ReturnType<typeof useSlider>;

export { SliderValue as S, UseSliderProps as U, SliderStepMark as a, SliderRenderThumbProps as b, UseSliderThumbProps as c, useSliderThumb as d, UseSliderThumbReturn as e, SliderThumb as f, SliderThumbProps as g, UseSliderReturn as h, useSlider as u };
