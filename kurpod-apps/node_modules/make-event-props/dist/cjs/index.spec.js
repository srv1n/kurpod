"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var vitest_1 = require("vitest");
var index_js_1 = __importStar(require("./index.js"));
(0, vitest_1.describe)('makeEventProps()', function () {
    var fakeEvent = {};
    (0, vitest_1.it)('returns object with valid and only valid event callbacks', function () {
        var props = {
            onClick: vitest_1.vi.fn(),
            someInvalidProp: vitest_1.vi.fn(),
        };
        var result = (0, index_js_1.default)(props);
        (0, vitest_1.expect)(result).toMatchObject({ onClick: vitest_1.expect.any(Function) });
    });
    (0, vitest_1.it)('calls getArgs function on event invoke if given', function () {
        var props = {
            onClick: vitest_1.vi.fn(),
            someInvalidProp: vitest_1.vi.fn(),
        };
        var getArgs = vitest_1.vi.fn();
        var result = (0, index_js_1.default)(props, getArgs);
        // getArgs shall not be invoked before a given event is fired
        (0, vitest_1.expect)(getArgs).not.toHaveBeenCalled();
        result.onClick(fakeEvent);
        (0, vitest_1.expect)(getArgs).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(getArgs).toHaveBeenCalledWith('onClick');
    });
    (0, vitest_1.it)('properly calls callbacks given in props given no getArgs function', function () {
        var props = {
            onClick: vitest_1.vi.fn(),
        };
        var result = (0, index_js_1.default)(props);
        result.onClick(fakeEvent);
        (0, vitest_1.expect)(props.onClick).toHaveBeenCalledWith(fakeEvent);
    });
    (0, vitest_1.it)('properly calls callbacks given in props given getArgs function', function () {
        var props = {
            onClick: vitest_1.vi.fn(),
        };
        var getArgs = vitest_1.vi.fn();
        var args = {};
        getArgs.mockReturnValue(args);
        var result = (0, index_js_1.default)(props, getArgs);
        result.onClick(fakeEvent);
        (0, vitest_1.expect)(props.onClick).toHaveBeenCalledWith(fakeEvent, args);
    });
    (0, vitest_1.it)('should not filter out valid event props', function () {
        var props = {
            onClick: vitest_1.vi.fn(),
        };
        var result = (0, index_js_1.default)(props);
        // @ts-expect-no-error
        result.onClick;
    });
    (0, vitest_1.it)('should filter out invalid event props', function () {
        var props = {
            someInvalidProp: vitest_1.vi.fn(),
        };
        var result = (0, index_js_1.default)(props);
        // @ts-expect-error-next-line
        result.someInvalidProp;
    });
    (0, vitest_1.it)('should allow valid onClick handler to be passed', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event) {
                // Intentionally empty
            },
        };
        // @ts-expect-no-error
        (0, index_js_1.default)(props);
    });
    (0, vitest_1.it)('should not allow invalid onClick handler to be passed', function () {
        var props = {
            onClick: 'potato',
        };
        // @ts-expect-error-next-line
        (0, index_js_1.default)(props);
    });
    (0, vitest_1.it)('should allow onClick handler with extra args to be passed if getArgs is provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-no-error
        (0, index_js_1.default)(props, function () { return 'hello'; });
    });
    (0, vitest_1.it)('should not allow onClick handler with extra args to be passed if getArgs is not provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-error-next-line
        (0, index_js_1.default)(props);
    });
    (0, vitest_1.it)('should not allow onClick handler with extra args to be passed if getArgs is provided but returns different type', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-error-next-line
        (0, index_js_1.default)(props, function () { return 5; });
    });
    (0, vitest_1.it)('should allow div onClick handler to be passed to div', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event) {
                // Intentionally empty
            },
        };
        var result = (0, index_js_1.default)(props);
        // @ts-expect-no-error
        (0, jsx_runtime_1.jsx)("div", { onClick: result.onClick });
    });
    (0, vitest_1.it)('should not allow div onClick handler to be passed to button', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event) {
                // Intentionally empty
            },
        };
        var result = (0, index_js_1.default)(props);
        // @ts-expect-error-next-line
        (0, jsx_runtime_1.jsx)("button", { onClick: result.onClick });
    });
    (0, vitest_1.it)('should allow div onClick handler with extra args to be passed to div if getArgs is provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        var result = (0, index_js_1.default)(props, function () { return 'hello'; });
        // @ts-expect-no-error
        (0, jsx_runtime_1.jsx)("div", { onClick: result.onClick });
    });
    (0, vitest_1.it)('should not allow div onClick handler with extra args to be passed to button if getArgs is provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        var result = (0, index_js_1.default)(props, function () { return 'hello'; });
        // @ts-expect-error-next-line
        (0, jsx_runtime_1.jsx)("button", { onClick: result.onClick });
    });
    (0, vitest_1.it)('should allow onClick handler with valid extra args to be passed with args explicitly typed', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-no-error
        (0, index_js_1.default)(props, function () { return 'hello'; });
    });
    (0, vitest_1.it)('should not allow onClick handler with invalid extra args to be passed with args explicitly typed', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-error-next-line
        (0, index_js_1.default)(props, function () { return 'hello'; });
    });
    (0, vitest_1.it)('should allow getArgs returning valid type to be passed with args explicitly typed', function () {
        var props = {};
        // @ts-expect-no-error
        (0, index_js_1.default)(props, function () { return 'hello'; });
    });
    (0, vitest_1.it)('should not allow getArgs returning invalid type to be passed with args explicitly typed', function () {
        var props = {};
        // @ts-expect-error-next-line
        (0, index_js_1.default)(props, function () { return 5; });
    });
});
(0, vitest_1.describe)('allEvents', function () {
    (0, vitest_1.it)('should contain all events', function () {
        var sortedAllEvents = new Set(__spreadArray([], index_js_1.allEvents, true).sort());
        (0, vitest_1.expect)(sortedAllEvents).toMatchSnapshot();
    });
});
