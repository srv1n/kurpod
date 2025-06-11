/**
 * This is the base classNames for all elements.
 * Is meant to be used with the `addBase` method from tailwindcss.
 */
declare const baseStyles: (prefix: string) => {
    color: string;
    backgroundColor: string;
};
/**
 * focus classNames when the element is focused by keyboard.
 */
declare const focusVisibleClasses: string[];
declare const dataFocusVisibleClasses: string[];
declare const groupDataFocusVisibleClasses: string[];
declare const ringClasses: string[];
/**
 * This classes centers the element by using absolute positioning.
 */
declare const translateCenterClasses: string[];
declare const absoluteFullClasses: string[];
/**
 * This object defines CSS classes for collapsing adjacent variant borders.
 * It includes classes for different variants like default, primary, secondary, etc.
 */
declare const collapseAdjacentVariantBorders: {
    default: string[];
    primary: string[];
    secondary: string[];
    success: string[];
    warning: string[];
    danger: string[];
};
declare const hiddenInputClasses: string[];

export { absoluteFullClasses, baseStyles, collapseAdjacentVariantBorders, dataFocusVisibleClasses, focusVisibleClasses, groupDataFocusVisibleClasses, hiddenInputClasses, ringClasses, translateCenterClasses };
