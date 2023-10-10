import { type DelimiterCase, toDelimiterCase } from './to-delimiter-case.js'
import { toLowerCase } from './to-lower-case.js'

/**
 * Transforms a string to kebab-case.
 */
export type KebabCase<T extends string> = Lowercase<DelimiterCase<T, '-'>>
/**
 * A strongly typed version of `toKebabCase` that works in both runtime and type level.
 * @param str the string to convert to kebab case.
 * @returns the kebab cased string.
 * @example toKebabCase('hello world') // 'hello-world'
 */
export function toKebabCase<T extends string>(str: T): KebabCase<T> {
  return toLowerCase(toDelimiterCase(str, '-'))
}
