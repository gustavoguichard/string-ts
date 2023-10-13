import { type DelimiterCase, delimiterCase } from './delimiter-case.js'
import { toUpperCase } from '../../native/to-upper-case.js'
import type { Upper } from '../case.js'

/**
 * Transforms a string to CONSTANT_CASE.
 */
export type ConstantCase<T extends string> = string extends T
  ? string
  : Upper<DelimiterCase<T, '_'>>
/**
 * A strongly typed version of `constantCase` that works in both runtime and type level.
 * @param str the string to convert to constant case.
 * @returns the constant cased string.
 * @example constantCase('hello world') // 'HELLO_WORLD'
 */
export function constantCase<T extends string>(str: T) {
  return toUpperCase(delimiterCase(str, '_')) as ConstantCase<T>
}

/**
 * @deprecated
 * Use `constantCase` instead.
 * Read more about the deprecation [here](https://github.com/gustavoguichard/string-ts/issues/44).
 */
export const toConstantCase = constantCase
