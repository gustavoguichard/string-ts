import type {
  IsStringLiteral,
  IsStringLiteralArray,
  All,
} from '../internal/literals.js'

/**
 * Joins a tuple of strings with the given delimiter.
 * T: The tuple of strings to join.
 * delimiter: The delimiter.
 */
export type Join<
  T extends readonly string[],
  delimiter extends string = '',
> = All<[IsStringLiteralArray<T>, IsStringLiteral<delimiter>]> extends true
  ? T extends readonly [
      infer first extends string,
      ...infer rest extends string[],
    ]
    ? rest extends []
      ? first
      : `${first}${delimiter}${Join<rest, delimiter>}`
    : ''
  : string

/**
 * A strongly-typed version of `Array.prototype.join`.
 * @param tuple the tuple of strings to join.
 * @param delimiter the delimiter.
 * @returns the joined string in both type level and runtime.
 * @example join(['hello', 'world'], '-') // 'hello-world'
 */
export function join<const T extends readonly string[], D extends string = ''>(
  tuple: T,
  delimiter: D = '' as D,
) {
  return tuple.join(delimiter) as Join<T, D>
}
