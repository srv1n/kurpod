import { DOMProps, AriaLabelingProps } from '@react-types/shared';

interface Options {
    /**
     * If the filter should be enabled.
     */
    enabled?: boolean;
    /**
     * If labelling associated aria properties should be included in the filter.
     */
    labelable?: boolean;
    /**
     * A Set of other property names that should be included in the filter.
     */
    propNames?: Set<string>;
    /**
     * A Set of other property names that should be removed from the filter.
     */
    omitPropNames?: Set<string>;
    /**
     * A Set of event names that should be excluded from the filter.
     */
    omitEventNames?: Set<string>;
    /**
     * Whether to omit data-* props.
     */
    omitDataProps?: boolean;
    /**
     * Whether to omit event props.
     */
    omitEventProps?: boolean;
}
/**
 * Filters out all props that aren't valid DOM props or defined via override prop obj.
 * @param props - The component props to be filtered.
 * @param opts - Props to override.
 */
declare function filterDOMProps(props: DOMProps & AriaLabelingProps, opts?: Options): DOMProps & AriaLabelingProps;

export { filterDOMProps };
