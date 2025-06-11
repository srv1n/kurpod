import * as _nextui_org_system from '@nextui-org/system';
import { UseImageProps } from './use-image.js';
import 'tailwind-variants';
import 'react';
import '@nextui-org/theme';
import '@nextui-org/react-utils';

interface ImageProps extends Omit<UseImageProps, "showSkeleton"> {
}
declare const Image: _nextui_org_system.InternalForwardRefRenderFunction<"img", ImageProps, never>;

export { ImageProps, Image as default };
