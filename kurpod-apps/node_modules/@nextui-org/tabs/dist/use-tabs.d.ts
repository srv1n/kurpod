import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { SlotsToClasses, TabsSlots, TabsVariantProps, TabsReturnType } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { RefObject } from 'react';
import { TabListStateOptions, TabListState } from '@react-stately/tabs';
import { AriaTabListProps } from '@react-aria/tabs';
import { CollectionProps } from '@nextui-org/aria-utils';
import { HTMLMotionProps } from 'framer-motion';

interface Props extends Omit<HTMLNextUIProps, "children"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The props to modify the cursor motion animation. Use the `variants` API to create your own animation.
     */
    motionProps?: HTMLMotionProps<"span">;
    /**
     * Whether the tabs selection should occur on press up instead of press down.
     * @default true
     */
    shouldSelectOnPressUp?: boolean;
    /**
     * Whether the cursor should be hidden.
     * @default false
     */
    disableCursorAnimation?: boolean;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Tabs classNames={{
     *    base:"base-classes", // main wrapper (tabs + panels)
     *    tabList: "tab-list-classes", // tabs wrapper
     *    tab: "tab-classes", // tab item
     *    panel: "panel-classes", // tab panel
     * }} />
     * ``
     */
    classNames?: SlotsToClasses<TabsSlots>;
    /**
     * The position of the tabs.
     * @default 'top'
     */
    placement?: "top" | "bottom" | "start" | "end";
    /**
     * Whether the tabs are vertical it will invalidate the placement prop when the value is true.
     * @default false
     */
    isVertical?: boolean;
    /**
     * Whether to destroy inactive tab panel when switching tabs. Inactive tab panels are inert and cannot be interacted with.
     * @default true
     */
    destroyInactiveTabPanel?: boolean;
}
type UseTabsProps<T> = Props & TabsVariantProps & Omit<TabListStateOptions<T>, "children" | keyof AriaTabListProps<T>> & Omit<AriaTabListProps<T>, "children" | "orientation"> & CollectionProps<T>;
type ValuesType<T = object> = {
    state: TabListState<T>;
    slots: TabsReturnType;
    disableCursorAnimation?: boolean;
    listRef?: RefObject<HTMLElement>;
    shouldSelectOnPressUp?: boolean;
    classNames?: SlotsToClasses<TabsSlots>;
    motionProps?: HTMLMotionProps<"span">;
    disableAnimation?: boolean;
    isDisabled?: boolean;
};
declare function useTabs<T extends object>(originalProps: UseTabsProps<T>): {
    Component: _nextui_org_system.As<any>;
    domRef: RefObject<HTMLElement>;
    state: TabListState<T>;
    values: ValuesType<T>;
    destroyInactiveTabPanel: boolean;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getTabListProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseTabsReturn = ReturnType<typeof useTabs>;

export { Props, UseTabsProps, UseTabsReturn, ValuesType, useTabs };
