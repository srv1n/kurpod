import * as react from 'react';
import { ReactNode } from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { ChipVariantProps, SlotsToClasses, ChipSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { PressEvent } from '@react-types/shared';

interface UseChipProps extends HTMLNextUIProps, ChipVariantProps {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * Avatar to be rendered in the left side of the chip.
     */
    avatar?: React.ReactNode;
    /**
     * Element to be rendered in the left side of the chip.
     * this props overrides the `avatar` prop.
     */
    startContent?: React.ReactNode;
    /**
     * Element to be rendered in the right side of the chip.
     * if you pass this prop and the `onClose` prop, the passed element
     * will have the close button props and it will be rendered instead of the
     * default close button.
     */
    endContent?: React.ReactNode;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Chip classNames={{
     *    base:"base-classes",
     *    dot: "dot-classes",
     *    content: "content-classes",
     *    avatar: "avatar-classes",
     *    closeButton: "close-button-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<ChipSlots>;
    /**
     * Callback fired when the chip is closed. if you pass this prop,
     * the chip will display a close button (endContent).
     * @param e PressEvent
     */
    onClose?: (e: PressEvent) => void;
}
declare function useChip(originalProps: UseChipProps): {
    Component: _nextui_org_system.As<any>;
    children: ReactNode;
    slots: {
        base: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        dot: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        avatar: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        closeButton: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        dot: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        avatar: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        closeButton: (slotProps?: ({
            isOneChar?: boolean | undefined;
            isCloseButtonFocusVisible?: boolean | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isCloseable?: boolean | undefined;
            hasStartContent?: boolean | undefined;
            hasEndContent?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "content" | "avatar" | "dot" | "closeButton"> | undefined;
    isDot: boolean;
    isCloseable: boolean;
    startContent: react.DetailedReactHTMLElement<react.HTMLAttributes<HTMLElement>, HTMLElement> | null;
    endContent: react.DetailedReactHTMLElement<react.HTMLAttributes<HTMLElement>, HTMLElement> | null;
    getCloseButtonProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getChipProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseChipReturn = ReturnType<typeof useChip>;

export { UseChipProps, UseChipReturn, useChip };
