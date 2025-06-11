import React from 'react';
import { PressEvent } from '@react-types/shared';

type RippleType = {
    key: React.Key;
    x: number;
    y: number;
    size: number;
};
interface UseRippleProps {
}
declare function useRipple(props?: UseRippleProps): {
    ripples: RippleType[];
    onClear: (key: React.Key) => void;
    onPress: (event: PressEvent) => void;
};
type UseRippleReturn = ReturnType<typeof useRipple>;

export { RippleType, UseRippleProps, UseRippleReturn, useRipple };
