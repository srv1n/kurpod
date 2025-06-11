import * as react_jsx_runtime from 'react/jsx-runtime';
import { UseCheckboxReturn } from './use-checkbox.js';
import '@nextui-org/system';
import '@nextui-org/theme';
import '@react-types/checkbox';
import 'react';

type CheckboxIconProps = Partial<ReturnType<UseCheckboxReturn["getIconProps"]>>;
/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 */
declare function CheckboxIcon(props: CheckboxIconProps): react_jsx_runtime.JSX.Element;

export { CheckboxIcon };
