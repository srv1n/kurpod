import { Selection } from '@react-types/shared';

/**
 * Part of this code is taken from @chakra-ui/system ❤️
 */

type As<Props = any> = React.ElementType<Props>;
type DOMElements = keyof JSX.IntrinsicElements;
type CapitalizedDOMElements = Capitalize<DOMElements>;
interface DOMElement extends Element, HTMLOrSVGElement {
}
type DataAttributes = {
    [dataAttr: string]: any;
};
type DOMAttributes<T = DOMElement> = React.AriaAttributes & React.DOMAttributes<T> & DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
};
type OmitCommonProps<Target, OmitAdditionalProps extends keyof any = never> = Omit<Target, "transition" | "as" | "color" | OmitAdditionalProps>;
type RightJoinProps<SourceProps extends object = {}, OverrideProps extends object = {}> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;
type MergeWithAs<ComponentProps extends object, AsProps extends object, AdditionalProps extends object = {}, AsComponent extends As = As> = (RightJoinProps<ComponentProps, AdditionalProps> | RightJoinProps<AsProps, AdditionalProps>) & {
    as?: AsComponent;
};
type InternalForwardRefRenderFunction<Component extends As, Props extends object = {}, OmitKeys extends keyof any = never> = {
    <AsComponent extends As = Component>(props: MergeWithAs<React.ComponentPropsWithoutRef<Component>, Omit<React.ComponentPropsWithoutRef<AsComponent>, OmitKeys>, Props, AsComponent>): React.ReactElement | null;
    readonly $$typeof: symbol;
    defaultProps?: Partial<Props> | undefined;
    propTypes?: React.WeakValidationMap<Props> | undefined;
    displayName?: string | undefined;
};
/**
 * Extract the props of a React element or component
 */
type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
    as?: As;
};
type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;
type HTMLNextUIProps<T extends As = "div", OmitKeys extends keyof any = never> = Omit<PropsOf<T>, "ref" | "color" | "slot" | "size" | "defaultChecked" | "defaultValue" | OmitKeys> & {
    as?: As;
};
type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (props?: Merge<DOMAttributes, P>, ref?: React.Ref<any>) => R & React.RefAttributes<any>;
type SharedSelection = Selection & {
    anchorKey?: string;
    currentKey?: string;
};

export { As, CapitalizedDOMElements, DOMAttributes, DOMElement, DOMElements, HTMLNextUIProps, InternalForwardRefRenderFunction, Merge, MergeWithAs, OmitCommonProps, PropGetter, PropsOf, RightJoinProps, SharedSelection };
