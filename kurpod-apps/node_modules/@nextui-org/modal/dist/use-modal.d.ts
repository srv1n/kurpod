import * as react from 'react';
import { ReactNode } from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { ModalVariantProps, SlotsToClasses, ModalSlots } from '@nextui-org/theme';
import { HTMLMotionProps } from 'framer-motion';
import { AriaModalOverlayProps } from '@react-aria/overlays';
import { ReactRef } from '@nextui-org/react-utils';
import { OverlayTriggerProps } from '@react-stately/overlays';

interface Props extends HTMLNextUIProps<"section"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
     */
    motionProps?: HTMLMotionProps<"section">;
    /**
     * Determines whether to hide the modal close button.
     * @default false
     */
    hideCloseButton?: boolean;
    /**
     * Custom modal close button element.
     */
    closeButton?: ReactNode;
    /**
     * Whether the animation should be disabled.
     * @default false
     */
    disableAnimation?: boolean;
    /**
     * The container element in which the overlay portal will be placed.
     * @default document.body
     */
    portalContainer?: Element;
    /**
     * Whether the scroll should be blocked when the modal is open.
     * @default true
     */
    shouldBlockScroll?: boolean;
    /**
     *  Callback fired when the modal is closed.
     */
    onClose?: () => void;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Modal classNames={{
     *    wrapper: "wrapper-classes", // main modal wrapper
     *    backdrop: "backdrop-classes",
     *    base:"base-classes", // modal content wrapper
     *    header: "header-classes", // modal header
     *    body: "body-classes", // modal body
     *    footer: "footer-classes", // modal footer
     *    closeButton: "close-button-classes", // modal close button
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<ModalSlots>;
}
type UseModalProps = Props & OverlayTriggerProps & AriaModalOverlayProps & ModalVariantProps;
declare function useModal(originalProps: UseModalProps): {
    Component: _nextui_org_system.As<any>;
    slots: {
        wrapper: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        base: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        backdrop: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        header: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        body: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        footer: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        closeButton: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        wrapper: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        base: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        backdrop: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        header: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        body: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        footer: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        closeButton: (slotProps?: ({
            backdrop?: "transparent" | "opaque" | "blur" | undefined;
            size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | undefined;
            placement?: "center" | "auto" | "top" | "top-center" | "bottom" | "bottom-center" | undefined;
            shadow?: "sm" | "md" | "lg" | undefined;
            scrollBehavior?: "normal" | "inside" | "outside" | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    domRef: react.RefObject<HTMLElement>;
    headerId: string;
    bodyId: string;
    motionProps: HTMLMotionProps<"section"> | undefined;
    classNames: SlotsToClasses<"base" | "body" | "footer" | "header" | "backdrop" | "wrapper" | "closeButton"> | undefined;
    isDismissable: boolean;
    closeButton: ReactNode;
    hideCloseButton: boolean;
    portalContainer: Element | undefined;
    shouldBlockScroll: boolean;
    backdrop: "transparent" | "opaque" | "blur";
    isOpen: boolean;
    onClose: () => void;
    disableAnimation: boolean;
    setBodyMounted: react.Dispatch<react.SetStateAction<boolean>>;
    setHeaderMounted: react.Dispatch<react.SetStateAction<boolean>>;
    getDialogProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getBackdropProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getCloseButtonProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseModalReturn = ReturnType<typeof useModal>;

export { UseModalProps, UseModalReturn, useModal };
