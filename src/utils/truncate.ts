import type {
  All,
  IsNumberLiteral,
  IsStringLiteral,
} from '../internal/literals.js'
import type { Math } from '../internal/math.js'
import { type Join, join } from '../native/join.js'
import type { Length } from '../native/length.js'
import type { Slice } from '../native/slice.js'

// STRING FUNCTIONS

/**
 * Truncate a string if it's longer than the given maximum length.
 * The last characters of the truncated string are replaced with the omission string which defaults to "...".
 */
export type Truncate<
  T extends string,
  Size extends number,
  Omission extends string = '...',
> = All<[IsStringLiteral<T | Omission>, IsNumberLiteral<Size>]> extends true
  ? Math.IsNegative<Size> extends true
    ? Omission
    : Math.Subtract<Length<T>, Size> extends 0
      ? T
      : Join<[Slice<T, 0, Math.Subtract<Size, Length<Omission>>>, Omission]>
  : string

/**
 * A strongly typed function to truncate a string if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission string which defaults to "...".
 * @param sentence the sentence to extract the words from.
 * @param length the maximum length of the string.
 * @param omission the string to append to the end of the truncated string.
 * @returns the truncated string
 * @example truncate('Hello, World', 8) // 'Hello...'
 */
export function truncate<
  T extends string,
  S extends number,
  P extends string = '...',
>(sentence: T, length: S, omission = '...' as P) {
  if (length < 0) return omission as Truncate<T, S, P>
  if (sentence.length <= length) return sentence as Truncate<T, S, P>
  return join([
    sentence.slice(0, length - omission.length),
    omission,
  ]) as Truncate<T, S, P>
}
