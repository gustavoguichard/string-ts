import { CapitalizeAll } from './internals'
import { Join, join } from './primitives'
import { Is, Words, words } from './utils'

// CASING UTILITIES
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
 * Capitalizes the first letter of a string. This is a runtime counterpart of `Capitalize<T>` from `src/types.d.ts`.
 * @param str the string to capitalize.
 * @returns the capitalized string.
 * @example capitalize('hello world') // 'Hello world'
 */
function capitalize<T extends string>(str: T) {
  return (toUpperCase(str.charAt(0)) + str.slice(1)) as Capitalize<T>
}

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
type CamelCase<T extends string> = Words<T> extends [infer first, ...infer rest]
  ? Join<[Lowercase<Is<first, string>>, ...CapitalizeAll<Is<rest, string[]>>]>
  : T
/**
 * A strongly typed version of `toCamelCase` that works in both runtime and type level.
 * @param str the string to convert to camel case.
 * @returns the camel cased string.
 * @example toCamelCase('hello world') // 'helloWorld'
 */
function toCamelCase<T extends string>(str: T) {
  const result = words(str).map(capitalize).join('')
  return (result.slice(0, 1).toLowerCase() + result.slice(1)) as CamelCase<T>
}

/**
 * Transforms a string to PascalCase.
 */
type PascalCase<T extends string> = Capitalize<CamelCase<T>>
/**
 * A strongly typed version of `toPascalCase` that works in both runtime and type level.
 * @param str the string to convert to pascal case.
 * @returns the pascal cased string.
 * @example toPascalCase('hello world') // 'HelloWorld'
 */
function toPascalCase<T extends string>(str: T): PascalCase<T> {
  return capitalize(toCamelCase(str))
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
  PascalCase,
  SnakeCase,
  TitleCase,
}
export {
  capitalize,
  toCamelCase,
  toConstantCase,
  toDelimiterCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
  toUpperCase,
}
