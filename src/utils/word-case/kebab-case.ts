import { type DelimiterCase, delimiterCase } from './delimiter-case.js'
import { toLowerCase } from '../../native/to-lower-case.js'
import {
  removeApostrophe,
  type RemoveApostrophe,
} from '../characters/apostrophe.js'

/**
 * Transforms a string to kebab-case.
 */
export type KebabCase<T extends string> = Lowercase<
  DelimiterCase<RemoveApostrophe<T>, '-'>
>
/**
 * A strongly typed version of `kebabCase` that works in both runtime and type level.
 * @param str the string to convert to kebab case.
 * @returns the kebab cased string.
 * @example kebabCase('hello world') // 'hello-world'
 */
export function kebabCase<T extends string>(str: T): KebabCase<T> {
  return toLowerCase(delimiterCase(removeApostrophe(str), '-'))
}

/**
 * @deprecated
 * Use `kebabCase` instead.
 * Read more about the deprecation [here](https://github.com/gustavoguichard/string-ts/issues/44).
 */
export const toKebabCase = kebabCase
