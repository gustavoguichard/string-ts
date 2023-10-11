import { type PascalCaseAll, pascalCaseAll } from '../../internal/internals.js'
import { type Join, join } from '../../native/join.js'
import { type Words, words } from '../words.js'

/**
 * Transforms a string to PascalCase.
 */
export type PascalCase<T extends string> = Join<PascalCaseAll<Words<T>>>
/**
 * A strongly typed version of `pascalCase` that works in both runtime and type level.
 * @param str the string to convert to pascal case.
 * @returns the pascal cased string.
 * @example pascalCase('hello world') // 'HelloWorld'
 */
export function pascalCase<T extends string>(str: T): PascalCase<T> {
  return join(pascalCaseAll(words(str)))
}

/**
 * @deprecated
 * Use `pascalCase` instead.
 * Read more about the deprecation [here](https://github.com/gustavoguichard/string-ts/issues/44).
 */
export const toPascalCase = pascalCase
