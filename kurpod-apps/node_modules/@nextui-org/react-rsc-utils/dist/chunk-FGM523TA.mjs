// src/children.ts
import { Children, isValidElement } from "react";
function getValidChildren(children) {
  return Children.toArray(children).filter(
    (child) => isValidElement(child)
  );
}
var pickChildren = (children, targetChild) => {
  var _a;
  let target = [];
  const withoutTargetChildren = (_a = Children.map(children, (item) => {
    if (!isValidElement(item))
      return item;
    if (item.type === targetChild) {
      target.push(item);
      return null;
    }
    return item;
  })) == null ? void 0 : _a.filter(Boolean);
  const targetChildren = target.length >= 0 ? target : void 0;
  return [withoutTargetChildren, targetChildren];
};

export {
  getValidChildren,
  pickChildren
};
