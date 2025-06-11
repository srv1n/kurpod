import { FormProps } from './base-form.js';
import './utils.js';
import * as React from 'react';
import '@react-types/form';
import '@react-types/shared';

declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;

export { Form };
