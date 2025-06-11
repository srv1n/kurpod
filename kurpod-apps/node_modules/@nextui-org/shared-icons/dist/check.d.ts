import * as react_jsx_runtime from 'react/jsx-runtime';
import { IconSvgProps } from './types.js';
import 'react';

interface CheckIconProps extends IconSvgProps {
    filled?: boolean;
}
declare const CheckIcon: ({ filled, ...props }: CheckIconProps) => react_jsx_runtime.JSX.Element;

export { CheckIcon, CheckIconProps };
