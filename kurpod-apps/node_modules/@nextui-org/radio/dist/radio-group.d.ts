import * as _nextui_org_system from '@nextui-org/system';
import { UseRadioGroupProps } from './use-radio-group.js';
import 'react';
import '@react-types/radio';
import '@react-types/shared';
import '@nextui-org/react-utils';
import '@nextui-org/theme';
import '@react-stately/radio';
import './radio.js';
import './use-radio.js';

interface RadioGroupProps extends Omit<UseRadioGroupProps, "defaultChecked"> {
}
declare const RadioGroup: _nextui_org_system.InternalForwardRefRenderFunction<"div", RadioGroupProps, never>;

export { RadioGroupProps, RadioGroup as default };
