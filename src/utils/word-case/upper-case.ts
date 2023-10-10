import { toUpperCase } from '../../native/to-upper-case.js'
import { type DelimiterCase, delimiterCase } from './delimiter-case.js'

/**
 * A strongly-typed version of `upperCase` that works in both runtime and type level.
 * @param str the string to convert to upper case.
 * @returns the uppercased string.
 * @example upperCase('hello-world') // 'HELLO WORLD'
 */
export function upperCase<T extends string>(
  str: T,
): Uppercase<DelimiterCase<T, ' '>> {
  return toUpperCase(delimiterCase(str, ' '))
}
