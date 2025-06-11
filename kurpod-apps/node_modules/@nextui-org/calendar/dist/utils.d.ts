import { DateValue } from '@internationalized/date';

declare function getYearRange(start?: DateValue | null, end?: DateValue | null): DateValue[];
declare function addMonths(date: DateValue, months: number): DateValue;
declare function getMonthsInYear(year: DateValue): DateValue[];

export { addMonths, getMonthsInYear, getYearRange };
