// src/assertion.ts
var __DEV__ = process.env.NODE_ENV !== "production";
var __TEST__ = process.env.NODE_ENV === "test";
function isArray(value) {
  return Array.isArray(value);
}
function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}
function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray(value);
}
function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}
function isEmpty(value) {
  if (isArray(value))
    return isEmptyArray(value);
  if (isObject(value))
    return isEmptyObject(value);
  if (value == null || value === "")
    return true;
  return false;
}
function isFunction(value) {
  return typeof value === "function";
}
var dataAttr = (condition) => condition ? "true" : void 0;
var isNumeric = (value) => value != null && parseInt(value.toString(), 10) > 0;

export {
  __DEV__,
  __TEST__,
  isArray,
  isEmptyArray,
  isObject,
  isEmptyObject,
  isEmpty,
  isFunction,
  dataAttr,
  isNumeric
};
