import { OverlayPlacement } from './types.js';
import { Placement, PlacementAxis } from '@react-types/overlays';

declare const getTransformOrigins: (placement: OverlayPlacement) => {
    originX?: number | undefined;
    originY?: number | undefined;
};
declare const toReactAriaPlacement: (placement: OverlayPlacement) => Placement;
declare const toOverlayPlacement: (placement: PlacementAxis) => OverlayPlacement;
declare const getShouldUseAxisPlacement: (axisPlacement: PlacementAxis, overlayPlacement: OverlayPlacement) => boolean;
declare const getArrowPlacement: (dynamicPlacement: PlacementAxis, placement: OverlayPlacement) => string;

export { getArrowPlacement, getShouldUseAxisPlacement, getTransformOrigins, toOverlayPlacement, toReactAriaPlacement };
