import * as _nextui_org_system from '@nextui-org/system';
import { UseTooltipProps } from './use-tooltip.js';
import '@nextui-org/aria-utils';
import 'react';
import '@nextui-org/theme';
import '@react-types/tooltip';
import '@react-types/overlays';
import 'framer-motion';
import '@react-aria/overlays';
import '@nextui-org/react-utils';

interface TooltipProps extends Omit<UseTooltipProps, "disableTriggerFocus" | "backdrop"> {
}
declare const Tooltip: _nextui_org_system.InternalForwardRefRenderFunction<"div", TooltipProps, never>;

export { TooltipProps, Tooltip as default };
