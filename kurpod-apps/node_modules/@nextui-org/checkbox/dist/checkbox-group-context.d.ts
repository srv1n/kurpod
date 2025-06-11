import * as react from 'react';
import { ContextType } from './use-checkbox-group.js';
import '@nextui-org/system';
import '@nextui-org/theme';
import '@react-types/checkbox';
import '@react-types/shared';
import '@nextui-org/react-utils';
import '@react-stately/checkbox';
import './checkbox.js';
import './use-checkbox.js';

declare const CheckboxGroupProvider: react.Provider<ContextType>;
declare const useCheckboxGroupContext: () => ContextType;

export { CheckboxGroupProvider, useCheckboxGroupContext };
