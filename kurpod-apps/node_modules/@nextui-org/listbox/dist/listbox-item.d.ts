import * as react_jsx_runtime from 'react/jsx-runtime';
import { UseListboxItemProps } from './use-listbox-item.js';
import './base/listbox-item-base.js';
import '@nextui-org/theme';
import '@react-aria/listbox';
import '@react-types/shared';
import '@nextui-org/aria-utils';
import 'react';
import 'tailwind-variants';
import '@nextui-org/system';
import '@react-stately/list';

interface ListboxItemProps<T extends object = object> extends Omit<UseListboxItemProps<T>, "hasDescriptionTextChild" | "hasTitleTextChild"> {
}
/**
 * @internal
 */
declare const ListboxItem: {
    (props: ListboxItemProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

export { ListboxItemProps, ListboxItem as default };
