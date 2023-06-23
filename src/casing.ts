import {
  CapitalizeAll,
  LowercaseAll,
  capitalizeAll,
  lowercaseAll,
} from './internals'
import { Join, join } from './primitives'
import { Is, Words, words } from './utils'

// CASING UTILITIES
/**
 * Capitalizes the first letter of a string. This is a runtime counterpart of `Capitalize<T>` from `src/types.d.ts`.
 * @param str the string to capitalize.
 * @returns the capitalized string.
 */
function capitalize<T extends string>(str: T) {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>
}

/**
 * A strongly typed version of `toCamelCase` that works in both runtime and type level.
 * @param str the string to convert to camel case.
 * @returns the camel cased string.
 */
type CamelCase<T extends string> = Words<T> extends [infer first, ...infer rest]
  ? Join<[Lowercase<Is<first, string>>, ...CapitalizeAll<Is<rest, string[]>>]>
  : T
function toCamelCase<T extends string>(str: T) {
  const result = capitalizeAll(words(str)).join('')
  return (result.slice(0, 1).toLowerCase() + result.slice(1)) as CamelCase<T>
}

/**
 * A strongly typed version of `toPascalCase` that works in both runtime and type level.
 * @param str the string to convert to pascal case.
 * @returns the pascal cased string.
 */
type PascalCase<T extends string> = Capitalize<CamelCase<T>>
function toPascalCase<T extends string>(str: T) {
  return capitalize(toCamelCase(str)) as PascalCase<T>
}

/**
 * A strongly typed version of `toKebabCase` that works in both runtime and type level.
 * @param str the string to convert to kebab case.
 * @returns the kebab cased string.
 */
type KebabCase<T extends string> = Words<T> extends [infer first, ...infer rest]
  ? Join<
      [Lowercase<Is<first, string>>, ...LowercaseAll<Is<rest, string[]>>],
      '-'
    >
  : T
function toKebabCase<T extends string>(str: T) {
  return join(lowercaseAll(words(str)), '-') as string as KebabCase<T>
}

/**
 * A strongly typed version of `toSnakeCase` that works in both runtime and type level.
 * @param str the string to convert to snake case.
 * @returns the snake cased string.
 */
type SnakeCase<T extends string> = Words<T> extends [infer first, ...infer rest]
  ? Join<
      [Lowercase<Is<first, string>>, ...LowercaseAll<Is<rest, string[]>>],
      '_'
    >
  : T
function toSnakeCase<T extends string>(str: T) {
  return join(lowercaseAll(words(str)), '_') as string as SnakeCase<T>
}

/**
 * A strongly typed version of `toConstantCase` that works in both runtime and type level.
 * @param str the string to convert to constant case.
 * @returns the constant cased string.
 */
type ConstantCase<T extends string> = Uppercase<SnakeCase<T>>
function toConstantCase<T extends string>(str: T) {
  return toSnakeCase(str).toUpperCase() as ConstantCase<T>
}

/**
 * A strongly typed version of `toTitleCase` that works in both runtime and type level.
 * @param str the string to convert to title case.
 * @returns the title cased string.
 */
type TitleCase<T extends string> = Join<Words<PascalCase<T>>, ' '>
function toTitleCase<T extends string>(str: T) {
  return join(words(toPascalCase(str)), ' ') as string as TitleCase<T>
}

export type {
  CamelCase,
  PascalCase,
  KebabCase,
  SnakeCase,
  ConstantCase,
  TitleCase,
}
export {
  capitalize,
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
  toConstantCase,
  toTitleCase,
}
