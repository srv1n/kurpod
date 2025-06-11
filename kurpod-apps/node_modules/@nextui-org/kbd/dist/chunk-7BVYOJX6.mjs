// src/utils.ts
var kbdKeysMap = {
  command: "\u2318",
  shift: "\u21E7",
  ctrl: "\u2303",
  option: "\u2325",
  enter: "\u21B5",
  delete: "\u232B",
  escape: "\u238B",
  tab: "\u21E5",
  capslock: "\u21EA",
  up: "\u2191",
  right: "\u2192",
  down: "\u2193",
  left: "\u2190",
  pageup: "\u21DE",
  pagedown: "\u21DF",
  home: "\u2196",
  end: "\u2198",
  help: "?",
  space: "\u2423"
};
var kbdKeysLabelMap = {
  command: "Command",
  shift: "Shift",
  ctrl: "Control",
  option: "Option",
  enter: "Enter",
  delete: "Delete",
  escape: "Escape",
  tab: "Tab",
  capslock: "Caps Lock",
  up: "Up",
  right: "Right",
  down: "Down",
  left: "Left",
  pageup: "Page Up",
  pagedown: "Page Down",
  home: "Home",
  end: "End",
  help: "Help",
  space: "Space"
};

export {
  kbdKeysMap,
  kbdKeysLabelMap
};
