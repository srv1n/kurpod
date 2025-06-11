import * as react from 'react';
import * as _nextui_org_theme from '@nextui-org/theme';
import * as tailwind_variants from 'tailwind-variants';
import * as _react_stately_calendar from '@react-stately/calendar';
import { CalendarDate } from '@internationalized/date';
import { PressEvent } from '@react-types/shared';
import { HTMLNextUIProps } from '@nextui-org/system';

type PickerValue = {
    value: string;
    label: string;
};
interface CalendarPickerProps extends HTMLNextUIProps<"div"> {
    date: CalendarDate;
    currentMonth: CalendarDate;
}
type CalendarPickerListType = "months" | "years";
declare function useCalendarPicker(props: CalendarPickerProps): {
    state: _react_stately_calendar.CalendarState | _react_stately_calendar.RangeCalendarState;
    slots: ({
        base: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        prevButton: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        nextButton: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        headerWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        header: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        grid: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridHeader: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridHeaderRow: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridHeaderCell: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridBody: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridBodyRow: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        cell: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        cellButton: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerMonthList: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerYearList: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerHighlight: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerItem: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        helperWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        errorMessage: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        prevButton: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        nextButton: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        headerWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        header: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        grid: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridHeader: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridHeaderRow: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridHeaderCell: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridBody: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        gridBodyRow: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        cell: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        cellButton: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerMonthList: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerYearList: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerHighlight: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        pickerItem: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        helperWrapper: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        errorMessage: (slotProps?: ({
            color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            isRange?: boolean | undefined;
            hideDisabledDates?: boolean | undefined;
            isHeaderWrapperExpanded?: boolean | undefined;
            showMonthAndYearPickers?: boolean | undefined;
            showShadow?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {}) | undefined;
    classNames: _nextui_org_theme.SlotsToClasses<"base" | "header" | "title" | "content" | "errorMessage" | "gridWrapper" | "grid" | "gridHeader" | "gridHeaderRow" | "gridHeaderCell" | "gridBody" | "gridBodyRow" | "cell" | "pickerWrapper" | "pickerMonthList" | "pickerYearList" | "pickerHighlight" | "helperWrapper" | "prevButton" | "nextButton" | "headerWrapper" | "cellButton" | "pickerItem"> | undefined;
    years: {
        value: number;
        label: string;
    }[];
    months: {
        value: number;
        label: string;
    }[];
    highlightRef: react.RefObject<HTMLDivElement>;
    monthsListRef: react.RefObject<HTMLDivElement>;
    yearsListRef: react.RefObject<HTMLDivElement>;
    getItemRef: (node: HTMLElement | null, value: number, list: CalendarPickerListType) => void;
    isHeaderExpanded: boolean | undefined;
    onPickerItemPressed: (e: PressEvent, list: CalendarPickerListType) => void;
    onPickerItemKeyDown: (e: React.KeyboardEvent<HTMLElement>, value: number, list: CalendarPickerListType) => void;
};
type UseCalendarPickerReturn = ReturnType<typeof useCalendarPicker>;

export { CalendarPickerProps, PickerValue, UseCalendarPickerReturn, useCalendarPicker };
