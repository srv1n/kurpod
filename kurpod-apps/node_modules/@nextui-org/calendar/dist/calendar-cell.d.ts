import * as react_jsx_runtime from 'react/jsx-runtime';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { CalendarReturnType, SlotsToClasses, CalendarSlots } from '@nextui-org/theme';
import { CalendarDate } from '@internationalized/date';
import { AriaCalendarCellProps } from '@react-aria/calendar';
import { HTMLNextUIProps } from '@nextui-org/system';

interface CalendarCellProps extends HTMLNextUIProps<"td">, AriaCalendarCellProps {
    state: CalendarState | RangeCalendarState;
    isPickerVisible?: boolean;
    slots?: CalendarReturnType;
    classNames?: SlotsToClasses<CalendarSlots>;
    currentMonth: CalendarDate;
}
declare function CalendarCell(originalProps: CalendarCellProps): react_jsx_runtime.JSX.Element;

export { CalendarCell, CalendarCellProps };
