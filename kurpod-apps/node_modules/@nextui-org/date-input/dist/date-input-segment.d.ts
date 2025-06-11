import { DateInputReturnType, SlotsToClasses, DateInputSlots } from '@nextui-org/theme';
import { HTMLNextUIProps } from '@nextui-org/system';
import { DateFieldState, DateSegment } from '@react-stately/datepicker';

interface DateInputSegmentProps extends HTMLNextUIProps<"div"> {
    state: DateFieldState;
    segment: DateSegment;
    slots: DateInputReturnType;
    classNames?: SlotsToClasses<DateInputSlots>;
}
declare const DateInputSegment: React.FC<DateInputSegmentProps>;

export { DateInputSegment, DateInputSegmentProps };
