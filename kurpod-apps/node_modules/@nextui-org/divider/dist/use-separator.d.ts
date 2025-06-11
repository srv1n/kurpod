import { DOMProps, AriaLabelingProps, Orientation, DOMAttributes } from '@react-types/shared';

interface SeparatorProps extends DOMProps, AriaLabelingProps {
    /**
     * The orientation of the separator.
     * @default 'horizontal'
     */
    orientation?: Orientation;
    /** The HTML element type that will be used to render the separator. */
    elementType?: string;
}
interface SeparatorAria {
    /** Props for the separator element. */
    separatorProps: DOMAttributes;
}
/**
 * Provides the accessibility implementation for a separator.
 * A separator is a visual divider between two groups of content,
 * e.g. groups of menu items or sections of a page.
 */
declare function useSeparator(props: SeparatorProps): SeparatorAria;

export { SeparatorAria, SeparatorProps, useSeparator };
