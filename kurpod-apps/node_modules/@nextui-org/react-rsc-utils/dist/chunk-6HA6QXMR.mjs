// src/functions.ts
import * as React from "react";
function renderFn({ Component, props, renderCustom }) {
  if (renderCustom && typeof renderCustom === "function") {
    return renderCustom(props);
  } else {
    return React.createElement(Component, props);
  }
}

export {
  renderFn
};
