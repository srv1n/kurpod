import * as react from 'react';
import { ReactNode } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { BreadcrumbItemVariantProps, SlotsToClasses, BreadcrumbItemSlots } from '@nextui-org/theme';
import { BreadcrumbItemProps } from '@react-types/breadcrumbs';
import { ReactRef } from '@nextui-org/react-utils';

interface Props extends Omit<HTMLNextUIProps<"li">, keyof BreadcrumbItemProps>, BreadcrumbItemProps {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLLIElement | null>;
    /**
     * The item custom separator. It is a chevron by default.
     */
    separator?: ReactNode;
    /**
     * Whether the item is the last one.
     * @default false
     */
    isLast?: boolean;
    /**
     * Whether to hide the separator element.
     * @default false
     */
    hideSeparator?: boolean;
    /**
     * The start content of the item.
     */
    startContent?: ReactNode;
    /**
     * The end content of the item.
     */
    endContent?: ReactNode;
    /**
     * The breadcrumbs item classNames.
     */
    classNames?: SlotsToClasses<BreadcrumbItemSlots>;
}
type UseBreadcrumbItemProps = Props & BreadcrumbItemVariantProps;
declare function useBreadcrumbItem(originalProps: UseBreadcrumbItemProps): {
    Component: string;
    WrapperComponent: _nextui_org_system.As<any>;
    children: ReactNode;
    separator: ReactNode;
    startContent: ReactNode;
    endContent: ReactNode;
    isDisabled: boolean | undefined;
    isCurrent: boolean;
    isLast: boolean | undefined;
    hideSeparator: boolean;
    getBaseProps: () => {
        id?: string | undefined;
        'aria-label'?: string | undefined;
        'aria-labelledby'?: string | undefined;
        'aria-describedby'?: string | undefined;
        'aria-details'?: string | undefined;
        ref: react.RefObject<HTMLLIElement>;
        "data-slot": string;
        className: string;
    };
    getItemProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getSeparatorProps: () => {
        "data-slot": string;
        "aria-hidden": boolean | "true" | "false";
        className: string;
    };
};
type UseBreadcrumbItemReturn = ReturnType<typeof useBreadcrumbItem>;

export { UseBreadcrumbItemProps, UseBreadcrumbItemReturn, useBreadcrumbItem };
