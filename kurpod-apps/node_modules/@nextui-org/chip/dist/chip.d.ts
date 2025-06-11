import * as _nextui_org_system from '@nextui-org/system';
import { UseChipProps } from './use-chip.js';
import 'react';
import 'tailwind-variants';
import '@nextui-org/theme';
import '@nextui-org/react-utils';
import '@react-types/shared';

interface ChipProps extends Omit<UseChipProps, "isOneChar" | "isCloseButtonFocusVisible"> {
}
declare const Chip: _nextui_org_system.InternalForwardRefRenderFunction<"div", ChipProps, never>;

export { ChipProps, Chip as default };
