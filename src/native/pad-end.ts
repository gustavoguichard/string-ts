import type {
  All,
  IsNumberLiteral,
  IsStringLiteral,
} from '../internal/literals.js'
import type { Math } from '../internal/math.js'
import type { Length } from './length.js'
import type { Repeat } from './repeat.js'
import type { Slice } from './slice.js'

/**
 * Pads a string at the end with another string.
 * T: The string to pad.
 * times: The number of times to pad.
 * pad: The string to pad with.
 */
export type PadEnd<
  T extends string,
  times extends number = 0,
  pad extends string = ' ',
> = All<[IsStringLiteral<T | pad>, IsNumberLiteral<times>]> extends true
  ? Math.IsNegative<times> extends false
    ? Math.Subtract<times, Length<T>> extends infer missing extends number
      ? `${T}${Slice<Repeat<pad, missing>, 0, missing>}`
      : never
    : T
  : string

/**
 * A strongly-typed version of `String.prototype.padEnd`.
 * @param str the string to pad.
 * @param length the length to pad.
 * @param pad the string to pad with.
 * @returns the padded string in both type level and runtime.
 * @example padEnd('hello', 10, '=') // 'hello====='
 */
export function padEnd<
  T extends string,
  N extends number = 0,
  U extends string = ' ',
>(str: T, length: N = 0 as N, pad: U = ' ' as U) {
  return str.padEnd(length, pad) as PadEnd<T, N, U>
}
