import * as react_jsx_runtime from 'react/jsx-runtime';
import { CalendarPickerProps } from './use-calendar-picker.js';
import 'react';
import '@nextui-org/theme';
import 'tailwind-variants';
import '@react-stately/calendar';
import '@internationalized/date';
import '@react-types/shared';
import '@nextui-org/system';

type PickerValue = {
    value: string;
    label: string;
};
declare function CalendarPicker(props: CalendarPickerProps): react_jsx_runtime.JSX.Element;

export { CalendarPicker, PickerValue };
