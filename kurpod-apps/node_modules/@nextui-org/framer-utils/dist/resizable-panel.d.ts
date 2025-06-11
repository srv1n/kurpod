import * as react from 'react';
import { HTMLNextUIProps } from '@nextui-org/system';

/**
 * Props for the ResizablePanel component.
 */
interface ResizablePanelProps extends HTMLNextUIProps<"div"> {
}
declare const ResizablePanel: react.ForwardRefExoticComponent<ResizablePanelProps & react.RefAttributes<HTMLDivElement>>;

export { ResizablePanel, ResizablePanelProps };
