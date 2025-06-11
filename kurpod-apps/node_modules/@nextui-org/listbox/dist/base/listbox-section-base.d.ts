import { SlotsToClasses, ListboxSectionSlots } from '@nextui-org/theme';
import { SectionProps } from '@nextui-org/aria-utils';
import { DividerProps } from '@nextui-org/divider';
import { ListboxItemProps } from '../listbox-item.js';
import 'react/jsx-runtime';
import '../use-listbox-item.js';
import './listbox-item-base.js';
import '@react-aria/listbox';
import '@react-types/shared';
import 'react';
import 'tailwind-variants';
import '@nextui-org/system';
import '@react-stately/list';

interface ListboxSectionBaseProps<T extends object = {}> extends SectionProps<"ul", T> {
    /**
     * The listbox section classNames.
     */
    classNames?: SlotsToClasses<ListboxSectionSlots>;
    /**
     * The listbox items classNames.
     */
    itemClasses?: ListboxItemProps["classNames"];
    /**
     * Whether to hide the check icon when the items are selected.
     * @default false
     */
    hideSelectedIcon?: boolean;
    /**
     * Shows a divider between sections
     * @default false
     */
    showDivider?: boolean;
    /**
     * The divider props
     */
    dividerProps?: DividerProps;
}
declare const ListboxSectionBase: <T extends object>(props: ListboxSectionBaseProps<T>) => JSX.Element;

export { ListboxSectionBaseProps, ListboxSectionBase as default };
