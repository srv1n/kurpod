"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = usePageContext;
const react_1 = require("react");
const PageContext_js_1 = __importDefault(require("../../PageContext.js"));
function usePageContext() {
    return (0, react_1.useContext)(PageContext_js_1.default);
}
