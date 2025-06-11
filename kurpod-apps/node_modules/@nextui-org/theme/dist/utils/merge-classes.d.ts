import { SlotsToClasses } from './types.js';
import 'tailwind-variants';

/**
 * Merges two sets of class names for each slot in a component.
 * @param itemClasses - Base classes for each slot
 * @param itemPropsClasses - Additional classes from props for each slot
 * @returns A merged object containing the combined classes for each slot
 */
declare const mergeClasses: <T extends SlotsToClasses<string>, P extends SlotsToClasses<string>>(itemClasses?: T | undefined, itemPropsClasses?: P | undefined) => T;

export { mergeClasses };
