import { ReactElement } from 'react';
import { UseListboxProps } from './use-listbox.js';
import 'tailwind-variants';
import '@nextui-org/system';
import '@react-types/shared';
import '@react-aria/listbox';
import '@nextui-org/theme';
import '@react-stately/list';
import '@nextui-org/react-utils';
import './listbox-item.js';
import 'react/jsx-runtime';
import './use-listbox-item.js';
import './base/listbox-item-base.js';
import '@nextui-org/aria-utils';

interface VirtualizationProps {
    maxListboxHeight: number;
    itemHeight: number;
}
interface Props<T> extends UseListboxProps<T> {
    isVirtualized?: boolean;
    virtualization?: VirtualizationProps;
}
type ListboxProps<T extends object = object> = Props<T>;
declare const Listbox: <T extends object>(props: ListboxProps<T>) => ReactElement;

export { ListboxProps, VirtualizationProps, Listbox as default };
