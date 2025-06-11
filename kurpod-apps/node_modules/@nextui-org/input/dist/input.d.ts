import * as _nextui_org_system from '@nextui-org/system';
import { UseInputProps } from './use-input.js';
import 'react';
import '@nextui-org/theme';
import '@react-types/textfield';

interface InputProps extends Omit<UseInputProps, "isMultiline"> {
}
declare const Input: _nextui_org_system.InternalForwardRefRenderFunction<"input", InputProps, never>;

export { InputProps, Input as default };
