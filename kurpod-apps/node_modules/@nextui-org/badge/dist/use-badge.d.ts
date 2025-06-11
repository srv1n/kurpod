import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { BadgeVariantProps, SlotsToClasses, BadgeSlots } from '@nextui-org/theme';
import { ReactNode } from 'react';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends HTMLNextUIProps<"span", "content"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLSpanElement | null>;
    /**
     * The children of the badge.
     */
    children: ReactNode;
    /**
     * The content of the badge. The badge will be rendered relative to its children.
     */
    content?: string | number | ReactNode;
    /**
     * Whether to disable the outline around the badge.
     * @deprecated use `showOutline` instead
     * @default false
     */
    disableOutline?: boolean;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Badge classNames={{
     *    base:"base-classes", // wrapper
     *    badge: "badge-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<BadgeSlots>;
}
type UseBadgeProps = Props & BadgeVariantProps;
declare function useBadge(originalProps: UseBadgeProps): {
    Component: _nextui_org_system.As<any>;
    children: ReactNode;
    content: ReactNode;
    slots: {
        base: (slotProps?: ({
            variant?: "solid" | "flat" | "faded" | "shadow" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | undefined;
            shape?: "circle" | "rectangle" | undefined;
            isInvisible?: boolean | undefined;
            isOneChar?: boolean | undefined;
            isDot?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            showOutline?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        badge: (slotProps?: ({
            variant?: "solid" | "flat" | "faded" | "shadow" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | undefined;
            shape?: "circle" | "rectangle" | undefined;
            isInvisible?: boolean | undefined;
            isOneChar?: boolean | undefined;
            isDot?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            showOutline?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            variant?: "solid" | "flat" | "faded" | "shadow" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | undefined;
            shape?: "circle" | "rectangle" | undefined;
            isInvisible?: boolean | undefined;
            isOneChar?: boolean | undefined;
            isDot?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            showOutline?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        badge: (slotProps?: ({
            variant?: "solid" | "flat" | "faded" | "shadow" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            size?: "sm" | "md" | "lg" | undefined;
            placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | undefined;
            shape?: "circle" | "rectangle" | undefined;
            isInvisible?: boolean | undefined;
            isOneChar?: boolean | undefined;
            isDot?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            showOutline?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "badge"> | undefined;
    disableAnimation: boolean;
    isInvisible: boolean | undefined;
    getBadgeProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseBadgeReturn = ReturnType<typeof useBadge>;

export { UseBadgeProps, UseBadgeReturn, useBadge };
