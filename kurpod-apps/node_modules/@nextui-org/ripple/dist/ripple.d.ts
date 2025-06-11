import { RippleType } from './use-ripple.js';
import { FC } from 'react';
import { HTMLMotionProps } from 'framer-motion';
import { HTMLNextUIProps } from '@nextui-org/system';
import '@react-types/shared';

interface RippleProps extends HTMLNextUIProps<"span"> {
    ripples: RippleType[];
    color?: string;
    motionProps?: HTMLMotionProps<"span">;
    style?: React.CSSProperties;
    onClear: (key: React.Key) => void;
}
declare const Ripple: FC<RippleProps>;

export { RippleProps, Ripple as default };
