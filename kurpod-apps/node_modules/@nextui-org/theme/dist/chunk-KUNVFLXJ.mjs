// src/utils/object.ts
import flatten from "flat";
function swapColorValues(colors) {
  const swappedColors = {};
  const keys = Object.keys(colors);
  const length = keys.length;
  for (let i = 0; i < length / 2; i++) {
    const key1 = keys[i];
    const key2 = keys[length - 1 - i];
    swappedColors[key1] = colors[key2];
    swappedColors[key2] = colors[key1];
  }
  if (length % 2 !== 0) {
    const middleKey = keys[Math.floor(length / 2)];
    swappedColors[middleKey] = colors[middleKey];
  }
  return swappedColors;
}
function removeDefaultKeys(obj) {
  const newObj = {};
  for (const key in obj) {
    if (key.endsWith("-DEFAULT")) {
      newObj[key.replace("-DEFAULT", "")] = obj[key];
      continue;
    }
    newObj[key] = obj[key];
  }
  return newObj;
}
var flattenThemeObject = (obj) => removeDefaultKeys(
  flatten(obj, {
    safe: true,
    delimiter: "-"
  })
);

export {
  swapColorValues,
  removeDefaultKeys,
  flattenThemeObject
};
