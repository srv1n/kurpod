import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonProps } from '@nextui-org/button';
import { CalendarDate } from '@internationalized/date';
import { HTMLNextUIProps } from '@nextui-org/system';

interface CalendarHeaderProps extends HTMLNextUIProps<"header"> {
    direction: number;
    date: CalendarDate;
    currentMonth: CalendarDate;
    buttonPickerProps?: ButtonProps;
}
declare function CalendarHeader(props: CalendarHeaderProps): react_jsx_runtime.JSX.Element;

export { CalendarHeader, CalendarHeaderProps };
