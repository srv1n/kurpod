/**
 * Returns an array of numbers, starting at `start` and ending at `end`.
 * @param start number
 * @param end number
 * @returns number[]
 */
declare function range(start: number, end: number): number[];
/**
 * Clamps a value between a minimum and maximum range.
 *
 * @param value - The value to be clamped.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns The clamped value.
 */
declare function clamp(value: number, min: number, max: number): number;
/**
 * Clamps a value between 0 and a maximum value.
 * @param value - The value to clamp.
 * @param max - The maximum value to clamp to. Defaults to 100.
 * @returns The clamped value.
 */
declare function clampPercentage(value: number, max?: number): number;

export { clamp, clampPercentage, range };
