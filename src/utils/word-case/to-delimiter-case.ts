import { join } from '../../native/join.js'
import type { Join } from '../../native/join.js'
import { words } from '../words.js'
import type { Words } from '../words.js'

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
 * @example toDelimiterCase('hello world', '.') // 'hello.world'
 */
export function toDelimiterCase<T extends string, D extends string>(
  str: T,
  delimiter: D,
): DelimiterCase<T, D> {
  return join(words(str), delimiter)
}
