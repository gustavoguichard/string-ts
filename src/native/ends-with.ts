import type { Math } from '../internal/math.js'
import type { Length } from './length.js'
import type { Slice } from './slice.js'

/**
 * Checks if a string ends with another string.
 * T: The string to check.
 * S: The string to check against.
 * P: The position the search should end.
 */
export type EndsWith<
  T extends string,
  S extends string,
  P extends number = Length<T>,
> = string extends T | S
  ? boolean
  : Math.IsNegative<P> extends false
  ? P extends Length<T>
    ? S extends Slice<T, Math.Subtract<Length<T>, Length<S>>, Length<T>>
      ? true
      : false
    : EndsWith<Slice<T, 0, P>, S, Length<T>> // P !== T.length, slice
  : false // P is negative, false

/**
 * A strongly-typed version of `String.prototype.endsWith`.
 * @param text the string to search.
 * @param search the string to search with.
 * @param position the index the search should end at.
 * @returns boolean, whether or not the text string ends with the search string.
 * @example endsWith('abc', 'c') // true
 */
export function endsWith<
  T extends string,
  S extends string,
  P extends number = Length<T>,
>(text: T, search: S, position = text.length as P) {
  return text.endsWith(search, position) as EndsWith<T, S, P>
}
