import * as react from 'react';
import { Ref } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { InputVariantProps, SlotsToClasses, InputSlots } from '@nextui-org/theme';
import { AriaTextFieldProps } from '@react-types/textfield';

interface Props<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> extends Omit<HTMLNextUIProps<"input">, keyof InputVariantProps> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<T>;
    /**
     * Ref to the container DOM node.
     */
    baseRef?: Ref<HTMLDivElement>;
    /**
     * Ref to the input wrapper DOM node.
     * This is the element that wraps the input label and the innerWrapper when the labelPlacement="inside"
     * and the input has start/end content.
     */
    wrapperRef?: Ref<HTMLDivElement>;
    /**
     * Ref to the input inner wrapper DOM node.
     * This is the element that wraps the input and the start/end content when passed.
     */
    innerWrapperRef?: Ref<HTMLDivElement>;
    /**
     * Element to be rendered in the left side of the input.
     */
    startContent?: React.ReactNode;
    /**
     * Element to be rendered in the right side of the input.
     * if you pass this prop and the `onClear` prop, the passed element
     * will have the clear button props and it will be rendered instead of the
     * default clear button.
     */
    endContent?: React.ReactNode;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Input classNames={{
     *    base:"base-classes",
     *    label: "label-classes",
     *    mainWrapper: "main-wrapper-classes",
     *    inputWrapper: "input-wrapper-classes",
     *    innerWrapper: "inner-wrapper-classes",
     *    input: "input-classes",
     *    clearButton: "clear-button-classes",
     *    helperWrapper: "helper-wrapper-classes",
     *    description: "description-classes",
     *    errorMessage: "error-message-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<InputSlots>;
    /**
     * Callback fired when the value is cleared.
     * if you pass this prop, the clear button will be shown.
     */
    onClear?: () => void;
    /**
     * React aria onChange event.
     */
    onValueChange?: (value: string) => void;
}
type UseInputProps<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> = Props<T> & Omit<AriaTextFieldProps, "onChange"> & InputVariantProps;
declare function useInput<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(originalProps: UseInputProps<T>): {
    Component: _nextui_org_system.As<any>;
    classNames: SlotsToClasses<"base" | "input" | "label" | "description" | "errorMessage" | "mainWrapper" | "inputWrapper" | "innerWrapper" | "helperWrapper" | "clearButton"> | undefined;
    domRef: react.RefObject<T>;
    label: react.ReactNode;
    description: react.ReactNode;
    startContent: react.ReactNode;
    endContent: react.ReactNode;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    isClearable: boolean | undefined;
    hasHelper: boolean;
    hasStartContent: boolean;
    isLabelOutside: boolean;
    isOutsideLeft: boolean;
    isLabelOutsideAsPlaceholder: boolean;
    shouldLabelBeOutside: boolean;
    shouldLabelBeInside: boolean;
    hasPlaceholder: boolean;
    isInvalid: boolean;
    errorMessage: react.ReactNode;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getInputProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getMainWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getInputWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getInnerWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getHelperWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getDescriptionProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getErrorMessageProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getClearButtonProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseInputReturn = ReturnType<typeof useInput>;

export { Props, UseInputProps, UseInputReturn, useInput };
