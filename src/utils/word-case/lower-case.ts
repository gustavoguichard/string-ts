import { toLowerCase } from '../../native/to-lower-case.js'
import { type DelimiterCase, delimiterCase } from './delimiter-case.js'

/**
 * A strongly-typed version of `lowerCase` that works in both runtime and type level.
 * @param str the string to convert to lower case.
 * @returns the lowercased string.
 * @example lowerCase('HELLO-WORLD') // 'hello world'
 */
export function lowerCase<T extends string>(
  str: T,
): Lowercase<DelimiterCase<T, ' '>> {
  return toLowerCase(delimiterCase(str, ' '))
}
