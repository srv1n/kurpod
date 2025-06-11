import * as react from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system_rsc from '@nextui-org/system-rsc';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system-rsc';
import { KbdVariantProps, SlotsToClasses, KbdSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { KbdKey } from './utils.js';

interface Props extends HTMLNextUIProps<"kbd"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The key or keys to be displayed.
     */
    keys?: KbdKey | KbdKey[];
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Kbd classNames={{
     *    base:"base-classes",
     *    abbr: "abbr-classes", // the key wrapper
     *    content: "content-classes", // the children wrapper
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<KbdSlots>;
}
type UseKbdProps = Props & KbdVariantProps;
declare function useKbd(originalProps: UseKbdProps): {
    Component: _nextui_org_system_rsc.As<any>;
    slots: {
        base: (slotProps?: ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        abbr: (slotProps?: ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        abbr: (slotProps?: ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"abbr" | "base" | "content"> | undefined;
    title: string | undefined;
    children: react.ReactNode;
    keysToRender: KbdKey[];
    getKbdProps: PropGetter<Record<string, unknown>, _nextui_org_system_rsc.DOMAttributes<_nextui_org_system_rsc.DOMElement>>;
};
type UseKbdReturn = ReturnType<typeof useKbd>;

export { UseKbdProps, UseKbdReturn, useKbd };
