'use client';
import { useRef } from 'react';
import { isDefined } from '../utils.js';
export default function useCachedValue(getter) {
    const ref = useRef(undefined);
    const currentValue = ref.current;
    if (isDefined(currentValue)) {
        return () => currentValue;
    }
    return () => {
        const value = getter();
        ref.current = value;
        return value;
    };
}
