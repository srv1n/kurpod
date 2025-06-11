import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import { ImgHTMLAttributes } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { ImageVariantProps, SlotsToClasses, ImageSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';

type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;
interface Props extends HTMLNextUIProps<"img"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLImageElement | null>;
    /**
     * Whether to add a blurred effect to the image.
     * @default false
     */
    isBlurred?: boolean;
    /**
     * A fallback image.
     */
    fallbackSrc?: React.ReactNode;
    /**
     * Whether to disable the loading skeleton.
     * @default false
     */
    disableSkeleton?: boolean;
    /**
     * A callback for when the image `src` has been loaded
     */
    onLoad?: NativeImageProps["onLoad"];
    /**
     * A loading strategy to use for the image.
     */
    loading?: NativeImageProps["loading"];
    /**
     * Whether to remove the wrapper element. This will cause the image to be rendered as a direct child of the parent element.
     * If you set this prop as `true` neither the skeleton nor the zoom effect will work.
     * @default false
     */
    removeWrapper?: boolean;
    /**
     * Controlled loading state.
     */
    isLoading?: boolean;
    /**
     * Function called when image failed to load
     */
    onError?: () => void;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Image classNames={{
     *    base:"base-classes", // image classes
     *    wrapper: "wrapper-classes",
     *    blurredImg: "blurredImg-classes", // this is a cloned version of the img
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<ImageSlots>;
}
type UseImageProps = Props & ImageVariantProps;
declare function useImage(originalProps: UseImageProps): {
    Component: _nextui_org_system.As<any>;
    domRef: react.RefObject<HTMLImageElement>;
    slots: {
        wrapper: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        zoomedWrapper: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        img: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        blurredImg: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        wrapper: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        zoomedWrapper: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        img: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        blurredImg: (slotProps?: ({
            radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
            shadow?: "none" | "sm" | "md" | "lg" | undefined;
            isZoomed?: boolean | undefined;
            showSkeleton?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"wrapper" | "zoomedWrapper" | "img" | "blurredImg"> | undefined;
    isBlurred: boolean | undefined;
    disableSkeleton: boolean;
    fallbackSrc: react.ReactNode;
    removeWrapper: boolean;
    isZoomed: boolean | undefined;
    isLoading: boolean | undefined;
    getImgProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getBlurredImgProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseImageReturn = ReturnType<typeof useImage>;

export { UseImageProps, UseImageReturn, useImage };
