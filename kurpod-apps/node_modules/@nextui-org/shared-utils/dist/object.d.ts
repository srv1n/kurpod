type Key = string | number;
interface MergeObject {
    [key: string]: any;
}
declare const renameProp: (oldProp: string, newProp: string, { [oldProp]: old, ...others }: {
    [x: string]: any;
}) => {
    [x: string]: any;
};
declare const copyObject: (obj: any) => any;
declare const omitObject: (obj: any, omitKeys: string[]) => any;
declare const cleanObject: (obj: any) => any;
declare const cleanObjectKeys: (obj: any, keys?: string[]) => any;
declare const getKeyValue: (obj: any, key: Key) => any;
/**
 * Get value from a deeply nested object using a string path.
 * Memorizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param fallback  - the fallback value
 */
declare const getProp: (obj: Record<string, any>, path: string | number, fallback?: any, index?: number) => any;
/**
 * Converting an array of objects into a single object.
 * @param arr - the array of objects
 * @returns the single object
 */
declare const arrayToObject: (arr: any[]) => any;
declare function compact<T extends Record<any, any>>(object: T): {} & T;

export { MergeObject, arrayToObject, cleanObject, cleanObjectKeys, compact, copyObject, getKeyValue, getProp, omitObject, renameProp };
