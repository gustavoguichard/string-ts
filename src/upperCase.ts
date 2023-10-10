import { toUpperCase } from './toUpperCase.js'
import { type DelimiterCase, toDelimiterCase } from './toDelimiterCase.js'

/**
 * A strongly-typed version of `upperCase` that works in both runtime and type level.
 * @param str the string to convert to upper case.
 * @returns the uppercased string.
 * @example upperCase('hello-world') // 'HELLO WORLD'
 */
export function upperCase<T extends string>(
  str: T,
): Uppercase<DelimiterCase<T, ' '>> {
  return toUpperCase(toDelimiterCase(str, ' '))
}
