import type {
  All,
  IsNumberLiteral,
  IsStringLiteral,
} from '../internal/literals.js'
import type { Math } from '../internal/math.js'
import type { Reverse } from '../utils/reverse.js'
import type { Length } from './length.js'
import type { Slice } from './slice.js'
import type { StartsWith } from './starts-with.js'

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

/**
 * Narrows a string-literal union to the members that end with another string.
 * It keeps every member for which `EndsWith` isn't provably `false`, so
 * non-literal members are preserved instead of being narrowed to `never`.
 * When `P` is omitted each member is checked against its own end.
 * T: The union to filter.
 * S: The string to search for.
 * P: The position the search should end.
 */
export type WhenEndsWith<
  T extends string,
  S extends string,
  P extends number | undefined = undefined,
> = T extends unknown ? (EndsWith<T, S, P> extends false ? never : T) : never

/**
 * A type-guard version of `endsWith`. It narrows the input string to the
 * members of a string-literal union that end with the search string.
 * Unlike `endsWith`, it returns a plain `boolean` (a type predicate can't also
 * surface the literal `true`/`false`), trading that literal for narrowing.
 * @param text the string to search.
 * @param search the string to search with.
 * @param position the index the search should end at.
 * @returns whether the text ends with the search string, narrowing `text`.
 * @example
 * declare const x: 'HouseCalendar' | 'HouseFirstReading'
 * if (endsWithGuard(x, 'Calendar')) {
 *   x // 'HouseCalendar'
 * }
 */
export function endsWithGuard<
  T extends string,
  S extends string,
  P extends number | undefined = undefined,
>(text: T, search: S, position?: P): text is WhenEndsWith<T, S, P> {
  return text.endsWith(search, position)
}
