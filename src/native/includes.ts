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

/**
 * Narrows a string-literal union to the members that include another string.
 * It keeps every member for which `Includes` isn't provably `false`, so
 * non-literal members are preserved instead of being narrowed to `never`.
 * T: The union to filter.
 * S: The string to search for.
 * P: The position to start the search.
 */
export type WhenIncludes<
  T extends string,
  S extends string,
  P extends number = 0,
> = T extends unknown ? (Includes<T, S, P> extends false ? never : T) : never

/**
 * A type-guard version of `includes`. It narrows the input string to the
 * members of a string-literal union that include the search string.
 * Unlike `includes`, it returns a plain `boolean` (a type predicate can't also
 * surface the literal `true`/`false`), trading that literal for narrowing.
 * @param text the string to search
 * @param search the string to search with
 * @param position the index to start search at
 * @returns whether the text contains the search string, narrowing `text`.
 * @example
 * declare const x: 'HouseCalendar' | 'SenateCalendar' | 'HouseFirstReading'
 * if (includesGuard(x, 'Calendar')) {
 *   x // 'HouseCalendar' | 'SenateCalendar'
 * }
 */
export function includesGuard<
  T extends string,
  S extends string,
  P extends number = 0,
>(text: T, search: S, position = 0 as P): text is WhenIncludes<T, S, P> {
  return text.includes(search, position)
}
