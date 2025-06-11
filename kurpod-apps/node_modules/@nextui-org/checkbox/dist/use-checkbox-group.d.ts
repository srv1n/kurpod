import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { SlotsToClasses, CheckboxGroupSlots } from '@nextui-org/theme';
import { AriaCheckboxGroupProps } from '@react-types/checkbox';
import { Orientation } from '@react-types/shared';
import { ReactRef } from '@nextui-org/react-utils';
import { CheckboxGroupState } from '@react-stately/checkbox';
import { CheckboxProps } from './checkbox.js';
import './use-checkbox.js';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * The axis the checkbox group items should align with.
     * @default "vertical"
     */
    orientation?: Orientation;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <CheckboxGroup classNames={{
     *    base:"base-classes",
     *    label: "label-classes",
     *    wrapper: "wrapper-classes", // checkboxes wrapper
     * }} >
     *  // checkboxes
     * </CheckboxGroup>
     * ```
     */
    classNames?: SlotsToClasses<CheckboxGroupSlots>;
    /**
     * React aria onChange event.
     */
    onValueChange?: AriaCheckboxGroupProps["onChange"];
}
type UseCheckboxGroupProps = Omit<Props, "onChange"> & AriaCheckboxGroupProps & Partial<Pick<CheckboxProps, "color" | "size" | "radius" | "lineThrough" | "isDisabled" | "disableAnimation">>;
type ContextType = {
    groupState: CheckboxGroupState;
    color?: CheckboxProps["color"];
    size?: CheckboxProps["size"];
    radius?: CheckboxProps["radius"];
    isInvalid?: UseCheckboxGroupProps["isInvalid"];
    lineThrough?: CheckboxProps["lineThrough"];
    isDisabled?: CheckboxProps["isDisabled"];
    disableAnimation?: CheckboxProps["disableAnimation"];
    validationBehavior?: CheckboxProps["validationBehavior"];
};
declare function useCheckboxGroup(props: UseCheckboxGroupProps): {
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
type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;

export { ContextType, UseCheckboxGroupProps, UseCheckboxGroupReturn, useCheckboxGroup };
