import type { Math } from '../internal/math.js'
import type { Slice } from './slice.js'

/**
 * Checks if a string starts with another string.
 * T: The string to check.
 * S: The string to check against.
 * P: The position to start the search.
 */
export type StartsWith<
  T extends string,
  S extends string,
  P extends number = 0,
> = Math.IsNegative<P> extends false
  ? P extends 0
    ? T extends `${S}${string}`
      ? true
      : false
    : StartsWith<Slice<T, P>, S, 0> // P is >0, slice
  : StartsWith<T, S, 0> // P is negative, ignore it

/**
 * A strongly-typed version of `String.prototype.startsWith`.
 * @param text the string to search.
 * @param search the string to search with.
 * @param position the index to start search at.
 * @returns boolean, whether or not the text string starts with the search string.
 * @example startsWith('abc', 'a') // true
 */
export function startsWith<
  T extends string,
  S extends string,
  P extends number = 0,
>(text: T, search: S, position = 0 as P) {
  return text.startsWith(search, position) as StartsWith<T, S, P>
}
