import { type DelimiterCase, toDelimiterCase } from './to-delimiter-case.js'
import { toLowerCase } from '../../native/to-lower-case.js'

/**
 * Transforms a string to snake_case.
 */
export type SnakeCase<T extends string> = Lowercase<DelimiterCase<T, '_'>>
/**
 * A strongly typed version of `toSnakeCase` that works in both runtime and type level.
 * @param str the string to convert to snake case.
 * @returns the snake cased string.
 * @example toSnakeCase('hello world') // 'hello_world'
 */
export function toSnakeCase<T extends string>(str: T): SnakeCase<T> {
  return toLowerCase(toDelimiterCase(str, '_'))
}
