import * as _nextui_org_system from '@nextui-org/system';
import { ReactNode } from 'react';
import { UseModalProps } from './use-modal.js';
import 'tailwind-variants';
import '@nextui-org/theme';
import 'framer-motion';
import '@react-aria/overlays';
import '@nextui-org/react-utils';
import '@react-stately/overlays';

interface ModalProps extends UseModalProps {
    /**
     * The content of the modal. Usually the ModalContent
     */
    children: ReactNode;
}
declare const Modal: _nextui_org_system.InternalForwardRefRenderFunction<"div", ModalProps, never>;

export { ModalProps, Modal as default };
