"use client";
import {
  useUser
} from "./chunk-6C2POLYT.mjs";

// src/user.tsx
import { forwardRef } from "@nextui-org/system";
import { Avatar } from "@nextui-org/avatar";
import { jsx, jsxs } from "react/jsx-runtime";
var User = forwardRef((props, ref) => {
  const { Component, name, slots, classNames, description, avatarProps, getUserProps } = useUser({
    ...props,
    ref
  });
  return /* @__PURE__ */ jsxs(Component, { ...getUserProps(), children: [
    /* @__PURE__ */ jsx(Avatar, { ...avatarProps }),
    /* @__PURE__ */ jsxs("div", { className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }), children: [
      /* @__PURE__ */ jsx("span", { className: slots.name({ class: classNames == null ? void 0 : classNames.name }), children: name }),
      /* @__PURE__ */ jsx("span", { className: slots.description({ class: classNames == null ? void 0 : classNames.description }), children: description })
    ] })
  ] });
});
User.displayName = "NextUI.User";
var user_default = User;

export {
  user_default
};
