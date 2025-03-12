import {
  type RemoveApostrophe,
  removeApostrophe,
} from '../characters/apostrophe.js'
import { type PascalCase, pascalCase } from './pascal-case.js'
import { uncapitalize } from './uncapitalize.js'

/**
 * Transforms a string to camelCase.
 */
export type CamelCase<T extends string> = Uncapitalize<
  PascalCase<RemoveApostrophe<T>>
>

/**
 * A strongly typed version of `camelCase` that works in both runtime and type level.
 * @param str the string to convert to camel case.
 * @returns the camel cased string.
 * @example camelCase('hello world') // 'helloWorld'
 */
export function camelCase<T extends string>(str: T): CamelCase<T> {
  return uncapitalize(pascalCase(removeApostrophe(str)))
}

/**
 * @deprecated
 * Use `camelCase` instead.
 * Read more about the deprecation [here](https://github.com/gustavoguichard/string-ts/issues/44).
 */
export const toCamelCase = camelCase
