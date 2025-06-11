import * as _nextui_org_system from '@nextui-org/system';
import { ReactNode } from 'react';
import { UsePopoverProps } from './use-popover.js';
import '@nextui-org/theme';
import 'framer-motion';
import '@nextui-org/react-utils';
import '@react-stately/overlays';
import '@react-types/overlays';
import '@react-aria/dialog';
import './use-aria-popover.js';
import '@react-aria/overlays';
import '@nextui-org/aria-utils';

interface PopoverProps extends UsePopoverProps {
    /**
     * The content of the popover. It is usually the `PopoverTrigger`,
     * and `PopoverContent`
     */
    children: ReactNode[];
}
declare const Popover: _nextui_org_system.InternalForwardRefRenderFunction<"div", PopoverProps, never>;

export { PopoverProps, Popover as default };
