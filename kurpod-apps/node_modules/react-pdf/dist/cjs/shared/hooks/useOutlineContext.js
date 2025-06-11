"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useOutlineContext;
const react_1 = require("react");
const OutlineContext_js_1 = __importDefault(require("../../OutlineContext.js"));
function useOutlineContext() {
    return (0, react_1.useContext)(OutlineContext_js_1.default);
}
