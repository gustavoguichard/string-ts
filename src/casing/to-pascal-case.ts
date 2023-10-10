import { pascalCaseAll, type PascalCaseAll } from '../internal/internals.js'
import type { Join } from '../native/join.js'
import { join } from '../native/join.js'
import type { Words } from './words.js'
import { words } from './words.js'

/**
 * Transforms a string to PascalCase.
 */
export type PascalCase<T extends string> = Join<PascalCaseAll<Words<T>>>
/**
 * A strongly typed version of `toPascalCase` that works in both runtime and type level.
 * @param str the string to convert to pascal case.
 * @returns the pascal cased string.
 * @example toPascalCase('hello world') // 'HelloWorld'
 */
export function toPascalCase<T extends string>(str: T): PascalCase<T> {
  return join(pascalCaseAll(words(str)))
}
