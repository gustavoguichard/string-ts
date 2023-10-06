import { pascalCaseAll, type PascalCaseAll } from './internals'
import type { Join } from './primitives'
import { charAt, join, slice } from './primitives'
import type { Words } from './utils'
import { words } from './utils'

// CASING UTILITIES THAT ALREADY HAVE NATIVE TS TYPES

/**
 * Capitalizes the first letter of a string. This is a runtime counterpart of `Capitalize<T>` from `src/types.d.ts`.
 * @param str the string to capitalize.
 * @returns the capitalized string.
 * @example capitalize('hello world') // 'Hello world'
 */
function capitalize<T extends string>(str: T): Capitalize<T> {
  return join([toUpperCase(charAt(str, 0)), slice(str, 1)])
}

/**
 * This function is a strongly-typed counterpart of String.prototype.toLowerCase.
 * @param str the string to make lowercase.
 * @returns the lowercased string.
 * @example toLowerCase('HELLO WORLD') // 'hello world'
 */
function toLowerCase<T extends string>(str: T) {
  return str.toLowerCase() as Lowercase<T>
}

/**
 * This function is a strongly-typed counterpart of String.prototype.toUpperCase.
 * @param str the string to make uppercase.
 * @returns the uppercased string.
 * @example toUpperCase('hello world') // 'HELLO WORLD'
 */
function toUpperCase<T extends string>(str: T) {
  return str.toUpperCase() as Uppercase<T>
}

/**
 * Uncapitalizes the first letter of a string. This is a runtime counterpart of `Uncapitalize<T>` from `src/types.d.ts`.
 * @param str the string to uncapitalize.
 * @returns the uncapitalized string.
 * @example uncapitalize('Hello world') // 'hello world'
 */
function uncapitalize<T extends string>(str: T): Uncapitalize<T> {
  return join([toLowerCase(charAt(str, 0)), slice(str, 1)])
}

// CASING UTILITIES

/**
 * Transforms a string with the specified separator (delimiter).
 */
type DelimiterCase<T extends string, D extends string> = Join<Words<T>, D>
/**
 * A function that transforms a string by splitting it into words and joining them with the specified delimiter.
 * @param str the string to transform.
 * @param delimiter the delimiter to use.
 * @returns the transformed string.
 * @example toDelimiterCase('hello world', '.') // 'hello.world'
 */
function toDelimiterCase<T extends string, D extends string>(
  str: T,
  delimiter: D,
): DelimiterCase<T, D> {
  return join(words(str), delimiter)
}

/**
 * Transforms a string to camelCase.
 */
type CamelCase<T extends string> = Uncapitalize<PascalCase<T>>

/**
 * A strongly typed version of `toCamelCase` that works in both runtime and type level.
 * @param str the string to convert to camel case.
 * @returns the camel cased string.
 * @example toCamelCase('hello world') // 'helloWorld'
 */
function toCamelCase<T extends string>(str: T): CamelCase<T> {
  return uncapitalize(toPascalCase(str))
}

/**
 * Transforms a string to lowercase, with words delimited by a space.
 */
type LowerCase<T extends string> = Lowercase<DelimiterCase<T, ' '>>

/**
 * A strongly-typed version of `lowerCase` that works in both runtime and type level.
 * @param str the string to convert to lower case.
 * @returns the lowercased string.
 * @example lowerCase('HELLO-WORLD') // 'hello world'
 */
function lowerCase<T extends string>(str: T): LowerCase<T> {
  return toLowerCase(toDelimiterCase(str, ' '))
}

/**
 * Transforms a string to lowercase, with words delimited by a space.
 */
type UpperCase<T extends string> = Uppercase<DelimiterCase<T, ' '>>
/**
 * A strongly-typed version of `upperCase` that works in both runtime and type level.
 * @param str the string to convert to upper case.
 * @returns the uppercased string.
 * @example upperCase('hello-world') // 'HELLO WORLD'
 */
function upperCase<T extends string>(str: T): UpperCase<T> {
  return toUpperCase(toDelimiterCase(str, ' '))
}

/**
 * Transforms a string to PascalCase.
 */
type PascalCase<T extends string> = Join<PascalCaseAll<Words<T>>>
/**
 * A strongly typed version of `toPascalCase` that works in both runtime and type level.
 * @param str the string to convert to pascal case.
 * @returns the pascal cased string.
 * @example toPascalCase('hello world') // 'HelloWorld'
 */
function toPascalCase<T extends string>(str: T): PascalCase<T> {
  return join(pascalCaseAll(words(str)))
}

/**
 * Transforms a string to kebab-case.
 */
type KebabCase<T extends string> = Lowercase<DelimiterCase<T, '-'>>
/**
 * A strongly typed version of `toKebabCase` that works in both runtime and type level.
 * @param str the string to convert to kebab case.
 * @returns the kebab cased string.
 * @example toKebabCase('hello world') // 'hello-world'
 */
function toKebabCase<T extends string>(str: T): KebabCase<T> {
  return toLowerCase(toDelimiterCase(str, '-'))
}

/**
 * Transforms a string to snake_case.
 */
type SnakeCase<T extends string> = Lowercase<DelimiterCase<T, '_'>>
/**
 * A strongly typed version of `toSnakeCase` that works in both runtime and type level.
 * @param str the string to convert to snake case.
 * @returns the snake cased string.
 * @example toSnakeCase('hello world') // 'hello_world'
 */
function toSnakeCase<T extends string>(str: T): SnakeCase<T> {
  return toLowerCase(toDelimiterCase(str, '_'))
}

/**
 * Transforms a string to CONSTANT_CASE.
 */
type ConstantCase<T extends string> = Uppercase<DelimiterCase<T, '_'>>
/**
 * A strongly typed version of `toConstantCase` that works in both runtime and type level.
 * @param str the string to convert to constant case.
 * @returns the constant cased string.
 * @example toConstantCase('hello world') // 'HELLO_WORLD'
 */
function toConstantCase<T extends string>(str: T): ConstantCase<T> {
  return toUpperCase(toDelimiterCase(str, '_'))
}

/**
 * Transforms a string to "Title Case".
 */
type TitleCase<T extends string> = DelimiterCase<PascalCase<T>, ' '>
/**
 * A strongly typed version of `toTitleCase` that works in both runtime and type level.
 * @param str the string to convert to title case.
 * @returns the title cased string.
 * @example toTitleCase('hello world') // 'Hello World'
 */
function toTitleCase<T extends string>(str: T): TitleCase<T> {
  return toDelimiterCase(toPascalCase(str), ' ')
}

export type {
  CamelCase,
  ConstantCase,
  DelimiterCase,
  KebabCase,
  LowerCase,
  PascalCase,
  SnakeCase,
  TitleCase,
  UpperCase,
}
export {
  capitalize,
  lowerCase,
  toCamelCase,
  toConstantCase,
  toDelimiterCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
  toUpperCase,
  uncapitalize,
  upperCase,
}
