import * as react_jsx_runtime from 'react/jsx-runtime';
import { CalendarDate } from '@internationalized/date';
import { CalendarPropsBase } from '@react-types/calendar';
import { HTMLNextUIProps } from '@nextui-org/system';

interface CalendarMonthProps extends HTMLNextUIProps<"table">, CalendarPropsBase {
    startDate: CalendarDate;
    currentMonth: number;
    direction: number;
}
declare function CalendarMonth(props: CalendarMonthProps): react_jsx_runtime.JSX.Element;

export { CalendarMonth, CalendarMonthProps };
