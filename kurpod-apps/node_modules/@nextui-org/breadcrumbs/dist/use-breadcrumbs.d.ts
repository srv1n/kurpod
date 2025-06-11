import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import { ReactElement, ReactNode, Key } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { BreadcrumbsVariantProps, SlotsToClasses, BreadcrumbsSlots } from '@nextui-org/theme';
import { AriaBreadcrumbsProps } from '@react-types/breadcrumbs';
import { ReactRef } from '@nextui-org/react-utils';
import { BreadcrumbItemProps } from './breadcrumb-item.js';
import './use-breadcrumb-item.js';

type RenderEllipsisItemProps = {
    /**
     * The collapsed items.
     */
    items: BreadcrumbItemProps[];
    /**
     * The max number of items.
     */
    maxItems: number;
    /**
     * The picked item to render the ellipsis.
     */
    collapsedItem: ReactNode;
    /**
     * The default ellipsis icon.
     */
    ellipsisIcon: ReactNode;
    /**
     * Number of items to show before the ellipsis.
     */
    itemsBeforeCollapse: number;
    /**
     * Number of items to show after the ellipsis.
     */
    itemsAfterCollapse: number;
    /**
     * The separator between each breadcrumb. It is a chevron by default.
     */
    separator: ReactNode;
};
interface Props extends HTMLNextUIProps<"nav">, AriaBreadcrumbsProps {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * If max items is exceeded, the number of items to show before the ellipsis.
     * @default 1
     */
    itemsBeforeCollapse?: number;
    /**
     * If max items is exceeded, the number of items to show after the ellipsis.
     * @default 2
     */
    itemsAfterCollapse?: number;
    /**
     * Specifies the maximum number of breadcrumbs to display. When there are more
     * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
     * will be shown, with an ellipsis in between.
     * @default 8
     */
    maxItems?: number;
    /**
     * The separator between each breadcrumb. It is a chevron by default.
     */
    separator?: ReactNode;
    /**
     * Breadcrumbs in a disabled state shows items, but indicates that navigation is
     * not available. This can be used to maintain layout continuity.
     * @default false
     */
    isDisabled?: boolean;
    /**
     * The breadcrumbs classNames.
     */
    classNames?: SlotsToClasses<BreadcrumbsSlots>;
    /**
     * The breadcrumbs items classNames.
     */
    itemClasses?: BreadcrumbItemProps["classNames"];
    /**
     * A function that allows to render the ellipsis when the number of items is exceeded.
     *
     * @param props RenderEllipsisItemProps
     */
    renderEllipsis?: (props: RenderEllipsisItemProps) => ReactNode;
    /**
     * Callback when any of the breadcrumbs is pressed.
     * @param key string
     */
    onAction?: (key: Key) => void;
}
type UseBreadcrumbsProps = Props & BreadcrumbsVariantProps & Partial<Pick<BreadcrumbItemProps, "color" | "size" | "underline" | "hideSeparator" | "disableAnimation">>;
declare function useBreadcrumbs(originalProps: UseBreadcrumbsProps): {
    Component: _nextui_org_system.As<any>;
    children: ReactElement<any, string | react.JSXElementConstructor<any>>[] | undefined;
    slots: {
        base: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        list: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        ellipsis: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        separator: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        list: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        ellipsis: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        separator: (slotProps?: ({
            size?: "sm" | "md" | "lg" | undefined;
            radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
            variant?: "solid" | "bordered" | "light" | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    separator: ReactNode;
    childCount: number;
    itemsAfterCollapse: number;
    itemsBeforeCollapse: number;
    maxItems: number;
    classNames: SlotsToClasses<"base" | "separator" | "list" | "ellipsis"> | undefined;
    isDisabled: boolean | undefined;
    itemProps: Partial<BreadcrumbItemProps>;
    renderEllipsis: ((props: RenderEllipsisItemProps) => ReactNode) | undefined;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getListProps: () => {
        "data-slot": string;
        className: string;
    };
    getEllipsisProps: () => {
        "data-slot": string;
        className: string;
    };
    getSeparatorProps: () => {
        "data-slot": string;
        "aria-hidden": boolean | "true" | "false";
        className: string;
    };
    onAction: ((key: Key) => void) | undefined;
};
type UseBreadcrumbsReturn = ReturnType<typeof useBreadcrumbs>;

export { UseBreadcrumbsProps, UseBreadcrumbsReturn, useBreadcrumbs };
