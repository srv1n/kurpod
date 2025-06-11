import * as react from 'react';
import { ContextType } from './use-card.js';
import '@nextui-org/system';
import '@react-types/shared';
import '@nextui-org/theme';
import '@nextui-org/ripple';
import '@react-aria/interactions';
import '@nextui-org/react-utils';

declare const CardProvider: react.Provider<ContextType>;
declare const useCardContext: () => ContextType;

export { CardProvider, useCardContext };
