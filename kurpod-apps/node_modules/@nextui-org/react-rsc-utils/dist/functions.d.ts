import * as React from 'react';

type RenderFunction<P> = (props: P) => React.ReactNode;
type RenderFnProps<P extends {}> = {
    Component: React.FunctionComponent<P> | React.ComponentClass<P> | string;
    props: P;
    renderCustom?: RenderFunction<P>;
};
/**
 * Render a component with custom render function
 *
 * @param Component  The component to be rendered
 * @param renderCustom The custom render function
 * @param props The props to be passed to the component
 * @returns React.ReactElement
 */
declare function renderFn<P extends {}>({ Component, props, renderCustom }: RenderFnProps<P>): React.ReactNode;

export { renderFn };
