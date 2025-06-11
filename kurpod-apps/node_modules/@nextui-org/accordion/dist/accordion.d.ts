import './base/accordion-item-base.js';
import * as _nextui_org_system from '@nextui-org/system';
import { UseAccordionProps } from './use-accordion.js';
import './use-accordion-item.js';
import '@nextui-org/theme';
import '@nextui-org/aria-utils';
import '@react-types/shared';
import 'react';
import 'framer-motion';
import '@react-types/accordion';
import '@nextui-org/react-utils';
import '@react-stately/tree';
import '@nextui-org/divider';
import './accordion-item.js';
import 'tailwind-variants';

interface AccordionProps extends UseAccordionProps {
}
declare const AccordionGroup: _nextui_org_system.InternalForwardRefRenderFunction<"div", AccordionProps, never>;

export { AccordionProps, AccordionGroup as default };
