import { FormProps as FormProps$1 } from '@react-types/form';
import React__default from 'react';
import { DOMProps, ContextValue } from './utils.js';
import '@react-types/shared';

interface FormProps extends FormProps$1, DOMProps {
    /**
     * Whether to use native HTML form validation to prevent form submission
     * when a field value is missing or invalid, or mark fields as required
     * or invalid via ARIA.
     * @default 'native'
     */
    validationBehavior?: "aria" | "native";
}
declare const FormContext: React__default.Context<ContextValue<FormProps, HTMLFormElement>>;
/**
 * A form is a group of inputs that allows users to submit data to a server,
 * with support for providing field validation errors.
 */
declare const Form: React__default.ForwardRefExoticComponent<FormProps & React__default.RefAttributes<HTMLFormElement>>;

export { Form, FormContext, FormProps };
