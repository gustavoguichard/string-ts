import type { Math } from '../internal/math.js'
import type { Length } from './length.js'
import type { Slice } from './slice.js'
import type { StartsWith } from './starts-with.js'
import type { Reverse } from '../utils/reverse.js'
import type {
  All,
  IsNumberLiteral,
  IsStringLiteral,
} from '../internal/literals.js'

/**
 * Checks if a string ends with another string.
 * T: The string to check.
 * S: The string to check against.
 * P: The position the search should end.
 */
export type EndsWith<
  T extends string,
  S extends string,
  P extends number | undefined = undefined,
> = P extends number ? _EndsWith<T, S, P> : _EndsWithNoPosition<T, S>

type _EndsWith<T extends string, S extends string, P extends number> = All<
  [IsStringLiteral<S>, IsNumberLiteral<P>]
> extends true
  ? Math.IsNegative<P> extends false
    ? P extends Length<T>
      ? IsStringLiteral<T> extends true
        ? S extends Slice<T, Math.Subtract<Length<T>, Length<S>>, Length<T>>
          ? true
          : false
        : _EndsWithNoPosition<Slice<T, 0, P>, S> // Eg: EndsWith<`abc${string}xyz`, 'c', 3>
      : _EndsWithNoPosition<Slice<T, 0, P>, S> // P !== T.length, slice
    : false // P is negative, false
  : boolean

/** Overload of EndsWith without P */
type _EndsWithNoPosition<T extends string, S extends string> = StartsWith<
  Reverse<T>,
  Reverse<S>
>

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
