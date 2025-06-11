import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import * as react from 'react';
import { ReactNode, MouseEventHandler } from 'react';
import { PressEvents, FocusableProps } from '@react-types/shared';
import { SlotsToClasses, CardSlots, CardVariantProps, CardReturnType } from '@nextui-org/theme';
import { RippleProps } from '@nextui-org/ripple';
import { PressEvent } from '@react-aria/interactions';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends Omit<HTMLNextUIProps<"div">, "onClick"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * Usually the Card parts, `CardHeader`, `CardBody` and `CardFooter`.
     */
    children?: ReactNode | ReactNode[];
    /**
     * Whether the card should show a ripple animation on press, this prop is ignored if `disableAnimation` is true or `isPressable` is false.
     * @default false
     */
    disableRipple?: boolean;
    /**
     * Whether the card should allow text selection on press. (only for pressable cards)
     * @default true
     */
    allowTextSelectionOnPress?: boolean;
    /**
     * The native button click event handler.
     * use `onPress` instead.
     * @deprecated
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Card classNames={{
     *    base:"base-classes",
     *    header: "dot-classes",
     *    body: "content-classes",
     *    footer: "avatar-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<CardSlots>;
}
type UseCardProps = Props & PressEvents & FocusableProps & CardVariantProps;
type ContextType = {
    slots: CardReturnType;
    classNames?: SlotsToClasses<CardSlots>;
    isDisabled?: CardVariantProps["isDisabled"];
    isFooterBlurred?: CardVariantProps["isFooterBlurred"];
    disableAnimation?: CardVariantProps["disableAnimation"];
    fullWidth?: CardVariantProps["fullWidth"];
};
declare function useCard(originalProps: UseCardProps): {
    context: ContextType;
    domRef: react.RefObject<HTMLDivElement>;
    Component: _nextui_org_system.As<any>;
    classNames: SlotsToClasses<"base" | "body" | "footer" | "header"> | undefined;
    children: ReactNode | ReactNode[];
    isHovered: boolean;
    isPressed: boolean;
    disableAnimation: boolean;
    isPressable: boolean | undefined;
    isHoverable: boolean | undefined;
    disableRipple: boolean;
    handlePress: (e: PressEvent) => void;
    isFocusVisible: boolean;
    getCardProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getRippleProps: () => RippleProps;
};
type UseCardReturn = ReturnType<typeof useCard>;

export { ContextType, Props, UseCardProps, UseCardReturn, useCard };
