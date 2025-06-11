import * as _nextui_org_aria_utils from '@nextui-org/aria-utils';
import { OverlayOptions } from '@nextui-org/aria-utils';
import * as react from 'react';
import { ReactNode } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { PopoverVariantProps, SlotsToClasses } from '@nextui-org/theme';
import { AriaTooltipProps } from '@react-types/tooltip';
import { OverlayTriggerProps } from '@react-types/overlays';
import { HTMLMotionProps } from 'framer-motion';
import { AriaOverlayProps } from '@react-aria/overlays';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends Omit<HTMLNextUIProps, "content"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The children to render. Usually a trigger element.
     */
    children?: ReactNode;
    /**
     * The content of the tooltip.
     */
    content?: string | React.ReactNode;
    /**
     * Whether the tooltip should be disabled, independent from the trigger.
     */
    isDisabled?: boolean;
    /**
     * The delay time in ms for the tooltip to show up.
     * @default 0
     */
    delay?: number;
    /**
     * The delay time in ms for the tooltip to hide.
     * @default 500
     */
    closeDelay?: number;
    /**
     * By default, opens for both focus and hover. Can be made to open only for focus.
     */
    trigger?: "focus";
    /**
     * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
     */
    motionProps?: HTMLMotionProps<"div">;
    /**
     * The container element in which the overlay portal will be placed.
     * @default document.body
     */
    portalContainer?: Element;
    /**
     * List of dependencies to update the position of the tooltip.
     * @default []
     */
    updatePositionDeps?: any[];
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Tooltip classNames={{
     *    base:"base-classes",
     *    content: "content-classes",
     *    arrow: "arrow-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<"base" | "arrow" | "content">;
}
type UseTooltipProps = Props & AriaTooltipProps & AriaOverlayProps & OverlayTriggerProps & OverlayOptions & PopoverVariantProps;
declare function useTooltip(originalProps: UseTooltipProps): {
    Component: _nextui_org_system.As<any>;
    content: ReactNode;
    children: ReactNode;
    isOpen: boolean;
    triggerRef: react.RefObject<HTMLElement>;
    showArrow: boolean;
    portalContainer: Element | undefined;
    placement: _nextui_org_aria_utils.OverlayPlacement;
    disableAnimation: boolean;
    isDisabled: boolean | undefined;
    motionProps: HTMLMotionProps<"div"> | undefined;
    getTooltipContentProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getTriggerProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getTooltipProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseTooltipReturn = ReturnType<typeof useTooltip>;

export { UseTooltipProps, UseTooltipReturn, useTooltip };
