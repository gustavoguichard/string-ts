import type { Math } from '../internal/math.js'
import type { Slice } from './slice.js'
import type { Repeat } from './repeat.js'
import type { Length } from './length.js'

/**
 * Pads a string at the start with another string.
 * T: The string to pad.
 * times: The number of times to pad.
 * pad: The string to pad with.
 */
export type PadStart<
  T extends string,
  times extends number = 0,
  pad extends string = ' ',
> = Math.IsNegative<times> extends false
  ? Math.Subtract<times, Length<T>> extends infer missing extends number
    ? `${Slice<Repeat<pad, missing>, 0, missing>}${T}`
    : never
  : T
/**
 * A strongly-typed version of `String.prototype.padStart`.
 * @param str the string to pad.
 * @param length the length to pad.
 * @param pad the string to pad with.
 * @returns the padded string in both type level and runtime.
 * @example padStart('hello', 10, '=') // '=====hello'
 */
export function padStart<
  T extends string,
  N extends number = 0,
  U extends string = ' ',
>(str: T, length: N = 0 as N, pad: U = ' ' as U) {
  return str.padStart(length, pad) as PadStart<T, N, U>
}
