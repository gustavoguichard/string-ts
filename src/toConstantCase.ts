import { type DelimiterCase, toDelimiterCase } from './toDelimiterCase.js'
import { toUpperCase } from './toUpperCase.js'

/**
 * Transforms a string to CONSTANT_CASE.
 */
export type ConstantCase<T extends string> = Uppercase<DelimiterCase<T, '_'>>
/**
 * A strongly typed version of `toConstantCase` that works in both runtime and type level.
 * @param str the string to convert to constant case.
 * @returns the constant cased string.
 * @example toConstantCase('hello world') // 'HELLO_WORLD'
 */
export function toConstantCase<T extends string>(str: T): ConstantCase<T> {
  return toUpperCase(toDelimiterCase(str, '_'))
}
