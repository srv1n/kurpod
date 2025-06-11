import * as _nextui_org_system from '@nextui-org/system';
import { UseInputProps } from './use-input.js';
import 'react';
import '@nextui-org/theme';
import '@react-types/textfield';

type OmittedInputProps = "isClearButtonFocusVisible" | "isLabelPlaceholder" | "isTextarea";
type TextareaHeightChangeMeta = {
    rowHeight: number;
};
interface TextAreaProps extends Omit<UseInputProps<HTMLTextAreaElement>, OmittedInputProps> {
    /**
     * Whether the textarea should automatically grow vertically to accomodate content.
     * @default false
     */
    disableAutosize?: boolean;
    /**
     * Minimum number of rows to show for textarea
     * @default 3
     */
    minRows?: number;
    /**
     * Maximum number of rows up to which the textarea can grow
     * @default 8
     */
    maxRows?: number;
    /**
     * Reuse previously computed measurements when computing height of textarea.
     * @default false
     */
    cacheMeasurements?: boolean;
    /**
     * Function invoked on textarea height change, with height as first argument.
     * The second function argument is an object containing additional information that
     * might be useful for custom behaviors. Current options include `{ rowHeight: number }`.
     *
     * @param height - The height of the textarea
     * @param meta - Additional information about the height change
     */
    onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
}
declare const Textarea: _nextui_org_system.InternalForwardRefRenderFunction<"textarea", TextAreaProps, never>;

export { TextAreaProps, TextareaHeightChangeMeta, Textarea as default };
