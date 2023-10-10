import { type Join, join } from '../../native/join.js'
import { type Words, words } from '../words.js'

/**
 * Transforms a string with the specified separator (delimiter).
 */
export type DelimiterCase<T extends string, D extends string> = Join<
  Words<T>,
  D
>
/**
 * A function that transforms a string by splitting it into words and joining them with the specified delimiter.
 * @param str the string to transform.
 * @param delimiter the delimiter to use.
 * @returns the transformed string.
 * @example delimiterCase('hello world', '.') // 'hello.world'
 */
export function delimiterCase<T extends string, D extends string>(
  str: T,
  delimiter: D,
): DelimiterCase<T, D> {
  return join(words(str), delimiter)
}

/**
 * @deprecated
 * Use `delimiterCase` instead.
 * Read more about the deprecation [here](https://github.com/gustavoguichard/string-ts/issues/44).
 */
export const toDelimiterCase = delimiterCase
