import * as react from 'react';
import { ContextType } from './use-button-group.js';
import '@nextui-org/system';
import './button.js';
import './use-button.js';
import '@nextui-org/theme';
import '@nextui-org/use-aria-button';
import '@nextui-org/ripple';
import '@nextui-org/react-utils';

declare const ButtonGroupProvider: react.Provider<ContextType>;
declare const useButtonGroupContext: () => ContextType;

export { ButtonGroupProvider, useButtonGroupContext };
