import * as _nextui_org_theme from '@nextui-org/theme';
import * as framer_motion from 'framer-motion';
import * as react from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';

declare const ModalProvider: react.Provider<{
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
    motionProps: framer_motion.HTMLMotionProps<"section"> | undefined;
    classNames: _nextui_org_theme.SlotsToClasses<"base" | "body" | "footer" | "header" | "backdrop" | "wrapper" | "closeButton"> | undefined;
    isDismissable: boolean;
    closeButton: react.ReactNode;
    hideCloseButton: boolean;
    portalContainer: Element | undefined;
    shouldBlockScroll: boolean;
    backdrop: "transparent" | "opaque" | "blur";
    isOpen: boolean;
    onClose: () => void;
    disableAnimation: boolean;
    setBodyMounted: react.Dispatch<react.SetStateAction<boolean>>;
    setHeaderMounted: react.Dispatch<react.SetStateAction<boolean>>;
    getDialogProps: _nextui_org_system.PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getBackdropProps: _nextui_org_system.PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getCloseButtonProps: _nextui_org_system.PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
}>;
declare const useModalContext: () => {
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
    motionProps: framer_motion.HTMLMotionProps<"section"> | undefined;
    classNames: _nextui_org_theme.SlotsToClasses<"base" | "body" | "footer" | "header" | "backdrop" | "wrapper" | "closeButton"> | undefined;
    isDismissable: boolean;
    closeButton: react.ReactNode;
    hideCloseButton: boolean;
    portalContainer: Element | undefined;
    shouldBlockScroll: boolean;
    backdrop: "transparent" | "opaque" | "blur";
    isOpen: boolean;
    onClose: () => void;
    disableAnimation: boolean;
    setBodyMounted: react.Dispatch<react.SetStateAction<boolean>>;
    setHeaderMounted: react.Dispatch<react.SetStateAction<boolean>>;
    getDialogProps: _nextui_org_system.PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getBackdropProps: _nextui_org_system.PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getCloseButtonProps: _nextui_org_system.PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};

export { ModalProvider, useModalContext };
