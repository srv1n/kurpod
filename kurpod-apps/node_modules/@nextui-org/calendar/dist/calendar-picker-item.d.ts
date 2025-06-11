import * as react from 'react';
import * as _react_types_button from '@react-types/button';
import * as _nextui_org_system from '@nextui-org/system';

declare const CalendarPickerItem: react.ForwardRefExoticComponent<Omit<_nextui_org_system.PropsOf<"button">, "slot" | "ref" | "color" | "size" | "defaultChecked" | "defaultValue"> & {
    as?: _nextui_org_system.As<any> | undefined;
} & _react_types_button.AriaButtonProps<"button"> & {
    allowTextSelectionOnPress?: boolean | undefined;
} & react.RefAttributes<HTMLButtonElement>>;

export { CalendarPickerItem };
