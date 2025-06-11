import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { SlotsToClasses, CircularProgressSlots, CircularProgressVariantProps } from '@nextui-org/theme';
import { AriaProgressBarProps } from '@react-types/progress';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The stroke of the circle and tracker
     * @default 2
     */
    strokeWidth?: number;
    /**
     * Whether to show the value label.
     * @default false
     */
    showValueLabel?: boolean;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <CircularProgress classNames={{
     *    base:"base-classes",
     *    label: "label-classes",
     *    value: "value-classes",
     *    svg: "svg-classes", // the svg wrapper
     *    track: "track-classes", // the circle of the background
     *    indicator: "indicator-classes", // the circle of the progress
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<CircularProgressSlots>;
}
type UseCircularProgressProps = Props & AriaProgressBarProps & CircularProgressVariantProps;
declare function useCircularProgress(originalProps: UseCircularProgressProps): {
    Component: _nextui_org_system.As<any>;
    domRef: react.RefObject<HTMLElement>;
    slots: {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        svgWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        svg: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        track: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        indicator: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        value: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        svgWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        svg: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        track: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        indicator: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        value: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "label" | "svgWrapper" | "svg" | "track" | "indicator" | "value"> | undefined;
    label: react.ReactNode;
    showValueLabel: boolean;
    getProgressBarProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getSvgProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getIndicatorProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getTrackProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseCircularProgressReturn = ReturnType<typeof useCircularProgress>;

export { Props, UseCircularProgressProps, UseCircularProgressReturn, useCircularProgress };
