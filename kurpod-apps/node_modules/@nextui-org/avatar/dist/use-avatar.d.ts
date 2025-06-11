import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, DOMAttributes, DOMElement, HTMLNextUIProps } from '@nextui-org/system';
import { AvatarVariantProps, SlotsToClasses, AvatarSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends HTMLNextUIProps<"span"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLSpanElement | null>;
    /**
     * Ref to the Image DOM node.
     */
    imgRef?: ReactRef<HTMLImageElement>;
    /**
     * The name of the person in the avatar. -
     * if **src** has loaded, the name will be used as the **alt** attribute of the **img**
     * - If **src** is not loaded, the name will be used to create the initials
     */
    name?: string;
    /**
     * Image source.
     */
    src?: string;
    /**
     * Image alt text.
     */
    alt?: string;
    icon?: React.ReactNode;
    /**
     * Whether the avatar can be focused.
     * @default false
     */
    isFocusable?: boolean;
    /**
     * If `true`, the fallback logic will be skipped.
     * @default false
     */
    ignoreFallback?: boolean;
    /**
     * If `false`, the avatar will show the background color while loading.
     */
    showFallback?: boolean;
    /**
     * Function to get the initials to display
     */
    getInitials?: (name: string) => string;
    /**
     * Custom fallback component.
     */
    fallback?: React.ReactNode;
    /**
     * Function called when image failed to load
     */
    onError?: () => void;
    /**
     * The component used to render the image.
     * @default "img"
     */
    ImgComponent?: React.ElementType;
    /**
     * Props to pass to the image component.
     */
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    /**
     * Classname or List of classes to change the classNames of the avatar.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Avatar classNames={{
     *    base:"base-classes",
     *    img: "image-classes",
     *    name: "name-classes",
     *    icon: "icon-classes",
     *    fallback: "fallback-classes"
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<AvatarSlots>;
}
type UseAvatarProps = Props & Omit<AvatarVariantProps, "children" | "isInGroup" | "isInGridGroup">;
declare function useAvatar(originalProps?: UseAvatarProps): {
    Component: _nextui_org_system.As<any>;
    ImgComponent: react.ElementType<any>;
    src: string | undefined;
    alt: string;
    icon: react.ReactNode;
    name: string | undefined;
    imgRef: react.RefObject<HTMLImageElement>;
    slots: {
        base: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        img: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        fallback: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        name: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        icon: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        img: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        fallback: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        name: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        icon: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            isBordered?: boolean | undefined;
            isDisabled?: boolean | undefined;
            isInGroup?: boolean | undefined;
            isInGridGroup?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"name" | "base" | "img" | "icon" | "fallback"> | undefined;
    fallback: react.ReactNode;
    isImgLoaded: boolean;
    showFallback: boolean;
    ignoreFallback: boolean;
    getInitials: (text: string) => string;
    getAvatarProps: PropGetter<Record<string, unknown>, DOMAttributes<DOMElement>>;
    getImageProps: PropGetter<Record<string, unknown>, DOMAttributes<DOMElement>>;
};
type UseAvatarReturn = ReturnType<typeof useAvatar>;

export { UseAvatarProps, UseAvatarReturn, useAvatar };
