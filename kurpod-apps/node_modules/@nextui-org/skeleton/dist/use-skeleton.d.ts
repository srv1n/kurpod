import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import { Ref } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { SkeletonVariantProps, SlotsToClasses, SkeletonSlots } from '@nextui-org/theme';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<HTMLElement | null>;
    /**
     * The skeleton will be visible while isLoading is `false`.
     * @default false
     */
    isLoaded?: boolean;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Skeleton classNames={{
     *    base:"base-classes", // skeleton wrapper
     *    content: "content-classes", // children wrapper
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<SkeletonSlots>;
}
type UseSkeletonProps = Props & SkeletonVariantProps;
declare function useSkeleton(originalProps: UseSkeletonProps): {
    Component: _nextui_org_system.As<any>;
    children: react.ReactNode;
    slots: {
        base: (slotProps?: ({
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "content"> | undefined;
    getSkeletonProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getContentProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseSkeletonReturn = ReturnType<typeof useSkeleton>;

export { UseSkeletonProps, UseSkeletonReturn, useSkeleton };
