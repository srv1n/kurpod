'use client';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import makeCancellable from 'make-cancellable-promise';
import makeEventProps from 'make-event-props';
import clsx from 'clsx';
import invariant from 'tiny-invariant';
import warning from 'warning';
import OutlineContext from './OutlineContext.js';
import OutlineItem from './OutlineItem.js';
import { cancelRunningTask } from './shared/utils.js';
import useDocumentContext from './shared/hooks/useDocumentContext.js';
import useResolver from './shared/hooks/useResolver.js';
/**
 * Displays an outline (table of contents).
 *
 * Should be placed inside `<Document />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<Document />`'s `onLoadSuccess` callback function.
 */
export default function Outline(props) {
    const documentContext = useDocumentContext();
    const mergedProps = Object.assign(Object.assign({}, documentContext), props);
    const { className, inputRef, onItemClick, onLoadError: onLoadErrorProps, onLoadSuccess: onLoadSuccessProps, pdf } = mergedProps, otherProps = __rest(mergedProps, ["className", "inputRef", "onItemClick", "onLoadError", "onLoadSuccess", "pdf"]);
    invariant(pdf, 'Attempted to load an outline, but no document was specified. Wrap <Outline /> in a <Document /> or pass explicit `pdf` prop.');
    const [outlineState, outlineDispatch] = useResolver();
    const { value: outline, error: outlineError } = outlineState;
    /**
     * Called when an outline is read successfully
     */
    function onLoadSuccess() {
        if (typeof outline === 'undefined' || outline === false) {
            return;
        }
        if (onLoadSuccessProps) {
            onLoadSuccessProps(outline);
        }
    }
    /**
     * Called when an outline failed to read successfully
     */
    function onLoadError() {
        if (!outlineError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        warning(false, outlineError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(outlineError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on pdf change
    useEffect(function resetOutline() {
        outlineDispatch({ type: 'RESET' });
    }, [outlineDispatch, pdf]);
    useEffect(function loadOutline() {
        if (!pdf) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        const cancellable = makeCancellable(pdf.getOutline());
        const runningTask = cancellable;
        cancellable.promise
            .then((nextOutline) => {
            outlineDispatch({ type: 'RESOLVE', value: nextOutline });
        })
            .catch((error) => {
            outlineDispatch({ type: 'REJECT', error });
        });
        return () => cancelRunningTask(runningTask);
    }, [outlineDispatch, pdf]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted callbacks so they are not called every time they change
    useEffect(() => {
        if (outline === undefined) {
            return;
        }
        if (outline === false) {
            onLoadError();
            return;
        }
        onLoadSuccess();
    }, [outline]);
    const childContext = useMemo(() => ({
        onItemClick,
    }), [onItemClick]);
    const eventProps = useMemo(() => makeEventProps(otherProps, () => outline), 
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps, outline]);
    if (!outline) {
        return null;
    }
    function renderOutline() {
        if (!outline) {
            return null;
        }
        return (_jsx("ul", { children: outline.map((item, itemIndex) => (_jsx(OutlineItem, { item: item, pdf: pdf }, typeof item.dest === 'string' ? item.dest : itemIndex))) }));
    }
    return (_jsx("div", Object.assign({ className: clsx('react-pdf__Outline', className), ref: inputRef }, eventProps, { children: _jsx(OutlineContext.Provider, { value: childContext, children: renderOutline() }) })));
}
