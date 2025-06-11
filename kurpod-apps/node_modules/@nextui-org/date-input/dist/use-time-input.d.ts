import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import * as _react_stately_datepicker from '@react-stately/datepicker';
import { DateInputVariantProps, SlotsToClasses, DateInputSlots } from '@nextui-org/theme';
import { TimeValue, AriaTimeFieldProps } from '@react-types/datepicker';
import { ReactRef } from '@nextui-org/react-utils';
import { DOMAttributes, GroupDOMAttributes } from '@react-types/shared';
import { DateInputGroupProps } from './date-input-group.js';

type NextUIBaseProps<T extends TimeValue> = Omit<HTMLNextUIProps<"div">, keyof AriaTimeFieldProps<T> | "onChange">;
interface Props<T extends TimeValue> extends NextUIBaseProps<T> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /** Props for the grouping element containing the date field and button. */
    groupProps?: GroupDOMAttributes;
    /** Props for the date picker's visible label element, if any. */
    labelProps?: DOMAttributes;
    /** Props for the date field. */
    fieldProps?: DOMAttributes;
    /** Props for the description element, if any. */
    descriptionProps?: DOMAttributes;
    /** Props for the error message element, if any. */
    errorMessageProps?: DOMAttributes;
    /**
     * The value of the hidden input.
     */
    inputRef?: ReactRef<HTMLInputElement | null>;
    /**
     * Element to be rendered in the left side of the input.
     */
    startContent?: React.ReactNode;
    /**
     * Element to be rendered in the right side of the input.
     */
    endContent?: React.ReactNode;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <DateInput classNames={{
     *    base:"base-classes",
     *    label: "label-classes",
     *    inputWrapper: "input-wrapper-classes",
     *    input: "input-classes",
     *    segment: "segment-classes",
     *    helperWrapper: "helper-wrapper-classes",
     *    description: "description-classes",
     *    errorMessage: "error-message-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<DateInputSlots>;
}
type UseTimeInputProps<T extends TimeValue> = Props<T> & DateInputVariantProps & AriaTimeFieldProps<T>;
declare function useTimeInput<T extends TimeValue>(originalProps: UseTimeInputProps<T>): {
    state: _react_stately_datepicker.TimeFieldState;
    domRef: react.RefObject<HTMLElement>;
    slots: {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        inputWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        input: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        innerWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        segment: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        helperWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        errorMessage: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        label: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        inputWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        input: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        innerWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        segment: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        helperWrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        errorMessage: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
            fullWidth?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "input" | "label" | "helperWrapper" | "description" | "errorMessage" | "inputWrapper" | "innerWrapper" | "segment"> | undefined;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    getBaseGroupProps: () => DateInputGroupProps;
    getFieldProps: (props?: DOMAttributes) => GroupDOMAttributes;
    getInputProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseTimeInputReturn = ReturnType<typeof useTimeInput>;

export { UseTimeInputProps, UseTimeInputReturn, useTimeInput };
