import { type PascalCase, pascalCase } from './pascal-case.js'
import { type DelimiterCase, delimiterCase } from './delimiter-case.js'

/**
 * Transforms a string to "Title Case".
 */
export type TitleCase<T extends string> = string extends T
  ? string
  : DelimiterCase<PascalCase<T>, ' '>
/**
 * A strongly typed version of `titleCase` that works in both runtime and type level.
 * @param str the string to convert to title case.
 * @returns the title cased string.
 * @example titleCase('hello world') // 'Hello World'
 */
export function titleCase<T extends string>(str: T) {
  return delimiterCase(pascalCase(str), ' ') as TitleCase<T>
}

/**
 * @deprecated
 * Use `titleCase` instead.
 * Read more about the deprecation [here](https://github.com/gustavoguichard/string-ts/issues/44).
 */
export const toTitleCase = titleCase
