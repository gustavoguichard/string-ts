import { type PascalCase, toPascalCase } from './to-pascal-case.js'
import { uncapitalize } from './uncapitalize.js'

/**
 * Transforms a string to camelCase.
 */
export type CamelCase<T extends string> = Uncapitalize<PascalCase<T>>

/**
 * A strongly typed version of `toCamelCase` that works in both runtime and type level.
 * @param str the string to convert to camel case.
 * @returns the camel cased string.
 * @example toCamelCase('hello world') // 'helloWorld'
 */
export function toCamelCase<T extends string>(str: T): CamelCase<T> {
  return uncapitalize(toPascalCase(str))
}
