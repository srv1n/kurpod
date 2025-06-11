declare function swapColorValues<T extends Object>(colors: T): {};
declare function removeDefaultKeys<T extends Object>(obj: T): {};
/**
 *
 * Flatten theme object and remove default keys
 *
 * @param obj theme object
 * @returns object with flattened keys
 */
declare const flattenThemeObject: <TTarget>(obj: TTarget) => {};

export { flattenThemeObject, removeDefaultKeys, swapColorValues };
