import plugin from 'tailwindcss/plugin.js';
import { NextUIPluginConfig } from './types.js';
import './colors/types.js';

/**
 * Based on tw-colors by L-Blondy
 * @see https://github.com/L-Blondy/tw-colors
 */

declare const nextui: (config?: NextUIPluginConfig) => ReturnType<typeof plugin>;

export { nextui };
