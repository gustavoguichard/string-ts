import { type PascalCase, toPascalCase } from './toPascalCase.js'
import { type DelimiterCase, toDelimiterCase } from './toDelimiterCase.js'

/**
 * Transforms a string to "Title Case".
 */
export type TitleCase<T extends string> = DelimiterCase<PascalCase<T>, ' '>
/**
 * A strongly typed version of `toTitleCase` that works in both runtime and type level.
 * @param str the string to convert to title case.
 * @returns the title cased string.
 * @example toTitleCase('hello world') // 'Hello World'
 */
export function toTitleCase<T extends string>(str: T): TitleCase<T> {
  return toDelimiterCase(toPascalCase(str), ' ')
}
