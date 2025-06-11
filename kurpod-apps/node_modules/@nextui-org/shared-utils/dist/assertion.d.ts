declare const __DEV__: boolean;
declare const __TEST__: boolean;
type Dict<T = any> = Record<string, T>;
declare function isArray<T>(value: any): value is Array<T>;
declare function isEmptyArray(value: any): boolean;
declare function isObject(value: any): value is Dict;
declare function isEmptyObject(value: any): boolean;
declare function isEmpty(value: any): boolean;
declare function isFunction<T extends Function = Function>(value: any): value is T;
type Booleanish = boolean | "true" | "false";
declare const dataAttr: (condition: boolean | undefined) => Booleanish;
declare const isNumeric: (value?: string | number) => boolean;

export { Dict, __DEV__, __TEST__, dataAttr, isArray, isEmpty, isEmptyArray, isEmptyObject, isFunction, isNumeric, isObject };
