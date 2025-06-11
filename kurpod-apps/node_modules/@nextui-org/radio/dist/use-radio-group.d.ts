import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { AriaRadioGroupProps } from '@react-types/radio';
import { Orientation } from '@react-types/shared';
import { ReactRef } from '@nextui-org/react-utils';
import { SlotsToClasses, RadioGroupSlots } from '@nextui-org/theme';
import { RadioGroupState } from '@react-stately/radio';
import { RadioProps } from './radio.js';
import './use-radio.js';

interface Props extends Omit<HTMLNextUIProps<"div">, "onChange"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * The axis the radio group items should align with.
     * @default "vertical"
     */
    orientation?: Orientation;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <RadioGroup classNames={{
     *    base:"base-classes",
     *    label: "label-classes",
     *    wrapper: "wrapper-classes", // radios wrapper
     * }} >
     *  // radios
     * </RadioGroup>
     * ```
     */
    classNames?: SlotsToClasses<RadioGroupSlots>;
    /**
     * React aria onChange event.
     */
    onValueChange?: AriaRadioGroupProps["onChange"];
}
type UseRadioGroupProps = Omit<Props, "defaultChecked"> & Omit<AriaRadioGroupProps, "onChange"> & Partial<Pick<RadioProps, "color" | "size" | "isDisabled" | "disableAnimation" | "onChange">>;
type ContextType = {
    groupState: RadioGroupState;
    isRequired?: UseRadioGroupProps["isRequired"];
    isInvalid?: UseRadioGroupProps["isInvalid"];
    color?: RadioProps["color"];
    size?: RadioProps["size"];
    isDisabled?: RadioProps["isDisabled"];
    disableAnimation?: RadioProps["disableAnimation"];
    onChange?: RadioProps["onChange"];
};
declare function useRadioGroup(props: UseRadioGroupProps): {
    Component: _nextui_org_system.As<any>;
    children: react.ReactNode;
    label: react.ReactNode;
    context: ContextType;
    description: react.ReactNode;
    isInvalid: boolean;
    errorMessage: react.ReactNode;
    getGroupProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getDescriptionProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getErrorMessageProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;

export { ContextType, UseRadioGroupProps, UseRadioGroupReturn, useRadioGroup };
