var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import makeEventProps, { allEvents } from './index.js';
describe('makeEventProps()', function () {
    var fakeEvent = {};
    it('returns object with valid and only valid event callbacks', function () {
        var props = {
            onClick: vi.fn(),
            someInvalidProp: vi.fn(),
        };
        var result = makeEventProps(props);
        expect(result).toMatchObject({ onClick: expect.any(Function) });
    });
    it('calls getArgs function on event invoke if given', function () {
        var props = {
            onClick: vi.fn(),
            someInvalidProp: vi.fn(),
        };
        var getArgs = vi.fn();
        var result = makeEventProps(props, getArgs);
        // getArgs shall not be invoked before a given event is fired
        expect(getArgs).not.toHaveBeenCalled();
        result.onClick(fakeEvent);
        expect(getArgs).toHaveBeenCalledTimes(1);
        expect(getArgs).toHaveBeenCalledWith('onClick');
    });
    it('properly calls callbacks given in props given no getArgs function', function () {
        var props = {
            onClick: vi.fn(),
        };
        var result = makeEventProps(props);
        result.onClick(fakeEvent);
        expect(props.onClick).toHaveBeenCalledWith(fakeEvent);
    });
    it('properly calls callbacks given in props given getArgs function', function () {
        var props = {
            onClick: vi.fn(),
        };
        var getArgs = vi.fn();
        var args = {};
        getArgs.mockReturnValue(args);
        var result = makeEventProps(props, getArgs);
        result.onClick(fakeEvent);
        expect(props.onClick).toHaveBeenCalledWith(fakeEvent, args);
    });
    it('should not filter out valid event props', function () {
        var props = {
            onClick: vi.fn(),
        };
        var result = makeEventProps(props);
        // @ts-expect-no-error
        result.onClick;
    });
    it('should filter out invalid event props', function () {
        var props = {
            someInvalidProp: vi.fn(),
        };
        var result = makeEventProps(props);
        // @ts-expect-error-next-line
        result.someInvalidProp;
    });
    it('should allow valid onClick handler to be passed', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event) {
                // Intentionally empty
            },
        };
        // @ts-expect-no-error
        makeEventProps(props);
    });
    it('should not allow invalid onClick handler to be passed', function () {
        var props = {
            onClick: 'potato',
        };
        // @ts-expect-error-next-line
        makeEventProps(props);
    });
    it('should allow onClick handler with extra args to be passed if getArgs is provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-no-error
        makeEventProps(props, function () { return 'hello'; });
    });
    it('should not allow onClick handler with extra args to be passed if getArgs is not provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-error-next-line
        makeEventProps(props);
    });
    it('should not allow onClick handler with extra args to be passed if getArgs is provided but returns different type', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-error-next-line
        makeEventProps(props, function () { return 5; });
    });
    it('should allow div onClick handler to be passed to div', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event) {
                // Intentionally empty
            },
        };
        var result = makeEventProps(props);
        // @ts-expect-no-error
        _jsx("div", { onClick: result.onClick });
    });
    it('should not allow div onClick handler to be passed to button', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event) {
                // Intentionally empty
            },
        };
        var result = makeEventProps(props);
        // @ts-expect-error-next-line
        _jsx("button", { onClick: result.onClick });
    });
    it('should allow div onClick handler with extra args to be passed to div if getArgs is provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        var result = makeEventProps(props, function () { return 'hello'; });
        // @ts-expect-no-error
        _jsx("div", { onClick: result.onClick });
    });
    it('should not allow div onClick handler with extra args to be passed to button if getArgs is provided', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        var result = makeEventProps(props, function () { return 'hello'; });
        // @ts-expect-error-next-line
        _jsx("button", { onClick: result.onClick });
    });
    it('should allow onClick handler with valid extra args to be passed with args explicitly typed', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-no-error
        makeEventProps(props, function () { return 'hello'; });
    });
    it('should not allow onClick handler with invalid extra args to be passed with args explicitly typed', function () {
        var props = {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick: function (event, args) {
                // Intentionally empty
            },
        };
        // @ts-expect-error-next-line
        makeEventProps(props, function () { return 'hello'; });
    });
    it('should allow getArgs returning valid type to be passed with args explicitly typed', function () {
        var props = {};
        // @ts-expect-no-error
        makeEventProps(props, function () { return 'hello'; });
    });
    it('should not allow getArgs returning invalid type to be passed with args explicitly typed', function () {
        var props = {};
        // @ts-expect-error-next-line
        makeEventProps(props, function () { return 5; });
    });
});
describe('allEvents', function () {
    it('should contain all events', function () {
        var sortedAllEvents = new Set(__spreadArray([], allEvents, true).sort());
        expect(sortedAllEvents).toMatchSnapshot();
    });
});
