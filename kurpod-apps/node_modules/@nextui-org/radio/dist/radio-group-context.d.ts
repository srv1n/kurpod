import * as react from 'react';
import { ContextType } from './use-radio-group.js';
import '@nextui-org/system';
import '@react-types/radio';
import '@react-types/shared';
import '@nextui-org/react-utils';
import '@nextui-org/theme';
import '@react-stately/radio';
import './radio.js';
import './use-radio.js';

declare const RadioGroupProvider: react.Provider<ContextType>;
declare const useRadioGroupContext: () => ContextType;

export { RadioGroupProvider, useRadioGroupContext };
