import { type DelimiterCase, delimiterCase } from './delimiter-case.js'
import { toLowerCase } from '../../native/to-lower-case.js'

/**
 * Transforms a string to snake_case.
 */
export type SnakeCase<T extends string> = string extends T
  ? string
  : Lowercase<DelimiterCase<T, '_'>>
/**
 * A strongly typed version of `snakeCase` that works in both runtime and type level.
 * @param str the string to convert to snake case.
 * @returns the snake cased string.
 * @example snakeCase('hello world') // 'hello_world'
 */
export function snakeCase<T extends string>(str: T) {
  return toLowerCase(delimiterCase(str, '_')) as SnakeCase<T>
}

/**
 * @deprecated
 * Use `snakeCase` instead.
 * Read more about the deprecation [here](https://github.com/gustavoguichard/string-ts/issues/44).
 */
export const toSnakeCase = snakeCase
