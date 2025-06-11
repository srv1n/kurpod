import { MultiSelectProps as MultiSelectProps$1, MultiSelectState } from './use-multiselect-state.js';
import { AriaButtonProps } from '@react-types/button';
import { AriaListBoxOptions } from '@react-aria/listbox';
import { HTMLAttributes, RefObject } from 'react';
import { ValidationResult } from '@react-types/shared';
import './use-multiselect-list-state.js';
import '@react-types/overlays';
import '@react-stately/menu';
import '@react-stately/form';
import '@react-stately/list';

type MultiSelectProps<T> = MultiSelectProps$1<T>;
interface MultiSelectAria<T> extends ValidationResult {
    /** Props for the label element. */
    labelProps: HTMLAttributes<HTMLElement>;
    /** Props for the popup trigger element. */
    triggerProps: AriaButtonProps;
    /** Props for the element representing the selected value. */
    valueProps: HTMLAttributes<HTMLElement>;
    /** Props for the popup. */
    menuProps: AriaListBoxOptions<T>;
    /** Props for the select's description element, if any. */
    descriptionProps: HTMLAttributes<HTMLElement>;
    /** Props for the select's error message element, if any. */
    errorMessageProps: HTMLAttributes<HTMLElement>;
}
declare function useMultiSelect<T>(props: MultiSelectProps<T>, state: MultiSelectState<T>, ref: RefObject<HTMLElement>): MultiSelectAria<T>;

export { MultiSelectAria, MultiSelectProps, useMultiSelect };
