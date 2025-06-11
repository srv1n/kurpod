import * as React$1 from 'react';
import { ReactNode } from 'react';

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
declare function getValidChildren(children: React.ReactNode): React$1.ReactElement<any, string | React$1.JSXElementConstructor<any>>[];
declare const pickChildren: <T = ReactNode>(children: T | undefined, targetChild: React.ElementType) => [T | undefined, T[] | undefined];

export { getValidChildren, pickChildren };
