import {
  isObject
} from "./chunk-MCFSCOSB.mjs";

// src/object.ts
var renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
  [newProp]: old,
  ...others
});
var copyObject = (obj) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  return { ...obj };
};
var omitObject = (obj, omitKeys) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  const newObj = { ...obj };
  omitKeys.forEach((key) => newObj[key] && delete newObj[key]);
  return newObj;
};
var cleanObject = (obj) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === void 0 || newObj[key] === null) {
      delete newObj[key];
    }
  });
  return newObj;
};
var cleanObjectKeys = (obj, keys = []) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  const newObj = { ...obj };
  keys.forEach((key) => {
    if (newObj[key]) {
      delete newObj[key];
    }
  });
  return newObj;
};
var getKeyValue = (obj, key) => {
  if (!isObject(obj))
    return obj;
  if (obj instanceof Array)
    return [...obj];
  return obj[key];
};
var getProp = (obj, path, fallback, index) => {
  const key = typeof path === "string" ? path.split(".") : [path];
  for (index = 0; index < key.length; index += 1) {
    if (!obj)
      break;
    obj = obj[key[index]];
  }
  return obj === void 0 ? fallback : obj;
};
var arrayToObject = (arr) => {
  if (!arr.length || !Array.isArray(arr))
    return {};
  return arr.reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});
};
function compact(object) {
  const clone = Object.assign({}, object);
  for (let key in clone) {
    if (clone[key] === void 0)
      delete clone[key];
  }
  return clone;
}

export {
  renameProp,
  copyObject,
  omitObject,
  cleanObject,
  cleanObjectKeys,
  getKeyValue,
  getProp,
  arrayToObject,
  compact
};
