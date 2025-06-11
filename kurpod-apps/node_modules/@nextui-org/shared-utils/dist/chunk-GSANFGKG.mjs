// src/console.ts
var warningStack = {};
function warn(message, component, ...args) {
  const tag = component ? ` [${component}]` : " ";
  const log = `[Next UI]${tag}: ${message}`;
  if (typeof console === "undefined")
    return;
  if (warningStack[log])
    return;
  warningStack[log] = true;
  if (process.env.NODE_ENV !== "production") {
    return console.warn(log, args);
  }
}

export {
  warn
};
