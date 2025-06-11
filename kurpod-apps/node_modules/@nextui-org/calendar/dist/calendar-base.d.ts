import * as react_jsx_runtime from 'react/jsx-runtime';
import { AriaButtonProps } from '@react-types/button';
import { HTMLNextUIProps, As } from '@nextui-org/system';
import { ButtonProps } from '@nextui-org/button';
import { ReactNode, HTMLAttributes, RefObject } from 'react';

interface CalendarBaseProps extends HTMLNextUIProps<"div"> {
    Component?: As;
    showHelper?: boolean;
    topContent?: ReactNode;
    bottomContent?: ReactNode;
    calendarProps: HTMLAttributes<HTMLElement>;
    nextButtonProps: AriaButtonProps;
    prevButtonProps: AriaButtonProps;
    buttonPickerProps?: ButtonProps;
    errorMessageProps: HTMLAttributes<HTMLElement>;
    calendarRef: RefObject<HTMLDivElement>;
    errorMessage?: ReactNode;
}
declare function CalendarBase(props: CalendarBaseProps): react_jsx_runtime.JSX.Element;

export { CalendarBase, CalendarBaseProps };
