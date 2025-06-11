/**
 * This code comes from @react-aria/overlays
 */
/**
 * Hides all elements in the DOM outside the given targets from screen readers using aria-hidden,
 * and returns a function to revert these changes. In addition, changes to the DOM are watched
 * and new elements outside the targets are automatically hidden.
 * @param targets - The elements that should remain visible.
 * @param root - Nothing will be hidden above this element.
 * @returns - A function to restore all hidden elements.
 */
declare function ariaHideOutside(targets: Element[], root?: HTMLElement): () => void;

export { ariaHideOutside };
