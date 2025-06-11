import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { CheckboxVariantProps, SlotsToClasses, CheckboxSlots } from '@nextui-org/theme';
import { AriaCheckboxProps } from '@react-types/checkbox';
import { ReactNode, Ref } from 'react';

type CheckboxIconProps = {
    "data-checked": string;
    isSelected: boolean;
    isIndeterminate: boolean;
    disableAnimation: boolean;
    className: string;
};
interface Props extends Omit<HTMLNextUIProps<"input">, keyof CheckboxVariantProps> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<HTMLInputElement>;
    /**
     * The label of the checkbox.
     */
    children?: ReactNode;
    /**
     * Whether the checkbox is disabled.
     * @default false
     */
    isDisabled?: boolean;
    /**
     * The icon to be displayed when the checkbox is checked.
     */
    icon?: ReactNode | ((props: CheckboxIconProps) => ReactNode);
    /**
     * React aria onChange event.
     */
    onValueChange?: AriaCheckboxProps["onChange"];
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Checkbox classNames={{
     *    base:"base-classes",
     *    wrapper: "wrapper-classes",
     *    icon: "icon-classes",
     *    label: "label-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<CheckboxSlots>;
}
type UseCheckboxProps = Omit<Props, "defaultChecked"> & Omit<AriaCheckboxProps, keyof CheckboxVariantProps | "onChange"> & CheckboxVariantProps;
declare function useCheckbox(props?: UseCheckboxProps): {
    Component: _nextui_org_system.As<any>;
    icon: ReactNode | ((props: CheckboxIconProps) => ReactNode);
    children: ReactNode;
    isSelected: boolean;
    isDisabled: boolean;
    isInvalid: boolean;
    isFocused: boolean;
    isHovered: boolean;
    isFocusVisible: boolean;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getInputProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getIconProps: () => CheckboxIconProps;
};
type UseCheckboxReturn = ReturnType<typeof useCheckbox>;

export { CheckboxIconProps, UseCheckboxProps, UseCheckboxReturn, useCheckbox };
