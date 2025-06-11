import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { AriaRadioProps } from '@react-types/radio';
import { RadioVariantProps, SlotsToClasses, RadioSlots } from '@nextui-org/theme';
import { ReactNode, Ref } from 'react';

interface Props extends Omit<HTMLNextUIProps<"input">, keyof RadioVariantProps> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<HTMLElement>;
    /**
     * The label of the checkbox.
     */
    children?: ReactNode;
    /**
     * The radio description text.
     */
    description?: string | ReactNode;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Radio classNames={{
     *    base:"base-classes",
     *    wrapper: "wrapper-classes",
     *    control: "control-classes", // inner circle
     *    labelWrapper: "label-wrapper-classes", // this wraps the label and description
     *    label: "label-classes",
     *    description: "description-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<RadioSlots>;
}
type UseRadioProps = Omit<Props, "defaultChecked"> & Omit<AriaRadioProps, keyof RadioVariantProps> & RadioVariantProps;
declare function useRadio(props: UseRadioProps): {
    Component: _nextui_org_system.As<any>;
    children: ReactNode;
    isSelected: boolean;
    isDisabled: boolean;
    isInvalid: boolean | undefined;
    isFocusVisible: boolean;
    description: ReactNode;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getInputProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getControlProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getDescriptionProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseRadioReturn = ReturnType<typeof useRadio>;

export { UseRadioProps, UseRadioReturn, useRadio };
