import type { Math } from '../internal/math.js'
import type { Slice } from './slice.js'

/**
 * Checks if a string includes another string.
 * T: The string to check.
 * S: The string to check against.
 * P: The position to start the search.
 */
export type Includes<
  T extends string,
  S extends string,
  P extends number = 0,
> = string extends T | S
  ? boolean
  : Math.IsNegative<P> extends false
  ? P extends 0
    ? T extends `${string}${S}${string}`
      ? true
      : false
    : Includes<Slice<T, P>, S, 0> // P is >0, slice
  : Includes<T, S, 0> // P is negative, ignore it

/**
 * A strongly-typed version of `String.prototype.includes`.
 * @param text the string to search
 * @param search the string to search with
 * @param position the index to start search at
 * @returns boolean, whether or not the text contains the search string.
 * @example includes('abcde', 'bcd') // true
 */
export function includes<
  T extends string,
  S extends string,
  P extends number = 0,
>(text: T, search: S, position = 0 as P) {
  return text.includes(search, position) as Includes<T, S, P>
}
