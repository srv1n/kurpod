import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { ProgressVariantProps, SlotsToClasses, ProgressSlots } from '@nextui-org/theme';
import { AriaProgressBarProps } from '@react-types/progress';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
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
     * <Progress classNames={{
     *    base:"base-classes",
     *    labelWrapper: "labelWrapper-classes",
     *    label: "label-classes",
     *    value: "value-classes",
     *    track: "track-classes",
     *    indicator: "indicator-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<ProgressSlots>;
}
type UseProgressProps = Props & AriaProgressBarProps & ProgressVariantProps;
declare function useProgress(originalProps: UseProgressProps): {
    Component: _nextui_org_system.As<any>;
    domRef: react.RefObject<HTMLElement>;
    slots: {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        labelWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        value: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        track: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        indicator: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        labelWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        value: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        track: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        indicator: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            isIndeterminate?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isStriped?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "label" | "track" | "indicator" | "value" | "labelWrapper"> | undefined;
    label: react.ReactNode;
    percentage: number | undefined;
    showValueLabel: boolean;
    getProgressBarProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseProgressReturn = ReturnType<typeof useProgress>;

export { UseProgressProps, UseProgressReturn, useProgress };
