import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import * as react from 'react';
import { Ref } from 'react';
import { LinkDOMProps, PressEvent } from '@react-types/shared';
import { PaginationItemValue } from '@nextui-org/use-pagination';

interface Props extends Omit<HTMLNextUIProps<"li">, "onClick"> {
    /**
     * Ref to the DOM node.
     */
    ref?: Ref<HTMLElement>;
    /**
     * Value of the item.
     */
    value?: PaginationItemValue;
    /**
     * Whether the item is active.
     * @default false
     */
    isActive?: boolean;
    /**
     * Whether the item is disabled.
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Callback fired when the item is clicked.
     * @param e MouseEvent
     * @deprecated Use `onPress` instead.
     */
    onClick?: HTMLNextUIProps<"li">["onClick"];
    /**
     * Callback fired when the item is clicked.
     * @param e PressEvent
     */
    onPress?: (e: PressEvent) => void;
    /**
     * Function to get the aria-label of the item.
     */
    getAriaLabel?: (page?: PaginationItemValue) => string | undefined;
}
type UsePaginationItemProps = Props & LinkDOMProps;
declare function usePaginationItem(props: UsePaginationItemProps): {
    Component: string;
    children: react.ReactNode;
    ariaLabel: string | undefined;
    isFocused: boolean;
    isFocusVisible: boolean;
    getItemProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UsePaginationItemReturn = ReturnType<typeof usePaginationItem>;

export { UsePaginationItemProps, UsePaginationItemReturn, usePaginationItem };
