// src/dimensions.ts
var getMargin = (num) => {
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`;
};

export {
  getMargin
};
