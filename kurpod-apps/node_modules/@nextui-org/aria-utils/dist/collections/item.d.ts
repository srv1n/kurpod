export { Item as BaseItem } from '@react-stately/collections';
import { ItemProps as ItemProps$1 } from '@react-types/shared';
import { As, HTMLNextUIProps } from '@nextui-org/system';

/**
 * A modified version of the ItemProps from @react-types/shared, with the addition of the NextUI props.
 *
 */
type ItemProps<Type extends As = "div", T extends object = {}> = ItemProps$1<T> & HTMLNextUIProps<Type>;

export { ItemProps };
