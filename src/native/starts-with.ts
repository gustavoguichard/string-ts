import type {
  All,
  IsNumberLiteral,
  IsStringLiteral,
} from '../internal/literals.js'
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
> = All<[IsStringLiteral<S>, IsNumberLiteral<P>]> extends true
  ? Math.IsNegative<P> extends false
    ? P extends 0
      ? S extends `${infer SHead}${infer SRest}`
        ? T extends `${infer THead}${infer TRest}`
          ? IsStringLiteral<THead | SHead> extends true
            ? THead extends SHead
              ? StartsWith<TRest, SRest>
              : false // Heads weren't equal
            : boolean // THead is non-literal
          : IsStringLiteral<T> extends true // Couldn't split T
            ? false // T ran out, but we still have S
            : boolean // T (or TRest) is not a literal
        : true // Couldn't split S, we've already ruled out non-literal
      : StartsWith<Slice<T, P>, S, 0> // P is >0, slice
    : StartsWith<T, S, 0> // P is negative, ignore it
  : boolean

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
