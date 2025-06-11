import * as _nextui_org_system_rsc from '@nextui-org/system-rsc';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system-rsc';
import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import { Ref } from 'react';
import { SpinnerVariantProps, SlotsToClasses, SpinnerSlots } from '@nextui-org/theme';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<HTMLElement | null>;
    /**
     * Spinner label, in case you passed it will be used as `aria-label`.
     */
    label?: string;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Spinner classNames={{
     *    base:"base-classes",
     *    wrapper: "wrapper-classes",
     *    circle1: "circle1-classes",
     *    circle2: "circle2-classes",
     *    label: "label-classes"
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<SpinnerSlots>;
}
type UseSpinnerProps = Props & SpinnerVariantProps;
declare function useSpinner(originalProps: UseSpinnerProps): {
    label: react.ReactNode;
    slots: {
        base: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        circle1: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        circle2: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        circle1: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        circle2: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "white" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            labelColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "label" | "wrapper" | "circle1" | "circle2"> | undefined;
    getSpinnerProps: PropGetter<Record<string, unknown>, _nextui_org_system_rsc.DOMAttributes<_nextui_org_system_rsc.DOMElement>>;
};
type UseSpinnerReturn = ReturnType<typeof useSpinner>;

export { UseSpinnerProps, UseSpinnerReturn, useSpinner };
