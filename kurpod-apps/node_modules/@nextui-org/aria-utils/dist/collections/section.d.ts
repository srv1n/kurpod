export { Section as BaseSection } from '@react-stately/collections';
import { SectionProps as SectionProps$1 } from '@react-types/shared';
import { As, HTMLNextUIProps } from '@nextui-org/system';

/**
 * A modified version of the SectionProps from @react-types/shared, with the addition of the NextUI props.
 *
 */
type SectionProps<Type extends As = "div", T extends object = {}> = SectionProps$1<T> & Omit<HTMLNextUIProps<Type>, "children">;

export { SectionProps };
