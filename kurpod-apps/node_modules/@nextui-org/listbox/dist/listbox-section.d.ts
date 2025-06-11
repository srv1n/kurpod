import * as _nextui_org_system from '@nextui-org/system';
import { Node } from '@react-types/shared';
import { ListState } from '@react-stately/list';
import { ListboxItemProps } from './listbox-item.js';
import { ListboxSectionBaseProps } from './base/listbox-section-base.js';
import 'react/jsx-runtime';
import './use-listbox-item.js';
import './base/listbox-item-base.js';
import '@nextui-org/theme';
import '@react-aria/listbox';
import '@nextui-org/aria-utils';
import 'react';
import 'tailwind-variants';
import '@nextui-org/divider';

interface ListboxSectionProps<T extends object = object> extends ListboxSectionBaseProps {
    item: Node<T>;
    state: ListState<T>;
    /**
     * The listbox items variant.
     */
    variant?: ListboxItemProps["variant"];
    /**
     * The listbox items color.
     */
    color?: ListboxItemProps["color"];
    /**
     * Whether to disable the items animation.
     * @default false
     */
    disableAnimation?: boolean;
}
/**
 * @internal
 */
declare const ListboxSection: _nextui_org_system.InternalForwardRefRenderFunction<"li", ListboxSectionProps<object>, never>;

export { ListboxSectionProps, ListboxSection as default };
