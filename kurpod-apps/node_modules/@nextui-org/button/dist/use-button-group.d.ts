import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { ButtonProps } from './button.js';
import { ButtonGroupVariantProps } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import './use-button.js';
import '@nextui-org/use-aria-button';
import '@nextui-org/ripple';

interface Props extends HTMLNextUIProps, ButtonGroupVariantProps {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * Whether the buttons are disabled.
     * @default false
     */
    isDisabled?: ButtonProps["isDisabled"];
}
type ContextType = {
    size?: ButtonProps["size"];
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    radius?: ButtonProps["radius"];
    isDisabled?: ButtonProps["isDisabled"];
    disableAnimation?: ButtonProps["disableAnimation"];
    disableRipple?: ButtonProps["disableRipple"];
    isIconOnly?: ButtonProps["isIconOnly"];
    fullWidth?: boolean;
};
type UseButtonGroupProps = Props & Partial<Pick<ButtonProps, "size" | "color" | "radius" | "variant" | "isIconOnly" | "disableAnimation" | "disableRipple">>;
declare function useButtonGroup(originalProps: UseButtonGroupProps): {
    Component: _nextui_org_system.As<any>;
    children: react.ReactNode;
    domRef: react.RefObject<HTMLDivElement>;
    context: ContextType;
    classNames: string;
    getButtonGroupProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseButtonGroupReturn = ReturnType<typeof useButtonGroup>;

export { ContextType, UseButtonGroupProps, UseButtonGroupReturn, useButtonGroup };
