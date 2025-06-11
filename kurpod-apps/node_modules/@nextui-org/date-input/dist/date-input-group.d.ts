import * as _nextui_org_system from '@nextui-org/system';
import { ReactElement, ReactNode, HTMLAttributes } from 'react';
import { ValidationResult, HelpTextProps, GroupDOMAttributes } from '@react-types/shared';

interface DateInputGroupProps extends ValidationResult, HelpTextProps {
    children?: ReactElement | ReactElement[];
    shouldLabelBeOutside?: boolean;
    label?: ReactNode;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    groupProps?: GroupDOMAttributes;
    wrapperProps?: HTMLAttributes<HTMLElement>;
    helperWrapperProps?: HTMLAttributes<HTMLElement>;
    labelProps?: HTMLAttributes<HTMLElement>;
    descriptionProps?: HTMLAttributes<HTMLElement>;
    errorMessageProps?: HTMLAttributes<HTMLElement>;
}
declare const DateInputGroup: _nextui_org_system.InternalForwardRefRenderFunction<"div", DateInputGroupProps, never>;

export { DateInputGroup, DateInputGroupProps };
