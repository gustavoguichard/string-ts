import { type CamelCase, toCamelCase } from '../casing/to-camel-case.js'
import {
  type ConstantCase,
  toConstantCase,
} from '../casing/to-constant-case.js'
import {
  type DelimiterCase,
  toDelimiterCase,
} from '../casing/to-delimiter-case.js'
import { type KebabCase, toKebabCase } from '../casing/to-kebab-case.js'
import { type PascalCase, toPascalCase } from '../casing/to-pascal-case.js'
import { type SnakeCase, toSnakeCase } from '../casing/to-snake-case.js'

import { typeOf } from '../internal/internals.js'

/**
 * This function is used to transform the keys of an object deeply.
 * It will only be transformed at runtime, so it's not type safe.
 * @param obj the object to transform.
 * @param transform the function to transform the keys from string to string.
 * @returns the transformed object.
 * @example deepTransformKeys({ 'foo-bar': { 'fizz-buzz': true } }, toCamelCase)
 * // { fooBar: { fizzBuzz: true } }
 */
function deepTransformKeys<T>(obj: T, transform: (s: string) => string): T {
  if (!['object', 'array'].includes(typeOf(obj))) return obj

  if (Array.isArray(obj)) {
    return obj.map((x) => deepTransformKeys(x, transform)) as T
  }
  const res = {} as T
  for (const key in obj) {
    res[transform(key) as keyof T] = deepTransformKeys(obj[key], transform)
  }
  return res
}

/**
 * Recursively transforms the keys of an Record to camelCase.
 * T: the type of the Record to transform.
 */
type DeepCamelKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepCamelKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepCamelKeys<V>[]
  : {
      [K in keyof T as CamelCase<Extract<K, string>>]: DeepCamelKeys<T[K]>
    }
/**
 * A strongly typed function that recursively transforms the keys of an object to camelCase. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example deepCamelKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { fooBar: { fizzBuzz: true } }
 */
function deepCamelKeys<T>(obj: T): DeepCamelKeys<T> {
  return deepTransformKeys(obj, toCamelCase) as never
}

/**
 * Recursively transforms the keys of an Record to CONSTANT_CASE.
 * T: the type of the Record to transform.
 */
type DeepConstantKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepConstantKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepConstantKeys<V>[]
  : {
      [K in keyof T as ConstantCase<Extract<K, string>>]: DeepConstantKeys<T[K]>
    }
/**
 * A strongly typed function that recursively transforms the keys of an object to CONSTANT_CASE. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example deepConstantKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { FOO_BAR: { FIZZ_BUZZ: true } }
 */
function deepConstantKeys<T>(obj: T): DeepConstantKeys<T> {
  return deepTransformKeys(obj, toConstantCase) as never
}

/**
 * Recursively transforms the keys of an Record to a custom delimiter case.
 * T: the type of the Record to transform.
 * D: the delimiter to use.
 */
type DeepDelimiterKeys<T, D extends string> = T extends [any, ...any]
  ? { [I in keyof T]: DeepDelimiterKeys<T[I], D> }
  : T extends (infer V)[]
  ? DeepDelimiterKeys<V, D>[]
  : {
      [K in keyof T as DelimiterCase<Extract<K, string>, D>]: DeepDelimiterKeys<
        T[K],
        D
      >
    }
/**
 * A strongly typed function that recursively transforms the keys of an object to a custom delimiter case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @param delimiter the delimiter to use.
 * @returns the transformed object.
 * @example deepDelimiterKeys({ 'foo-bar': { 'fizz-buzz': true } }, '.') // { 'foo.bar': { 'fizz.buzz': true } }
 */
function deepDelimiterKeys<T, D extends string>(
  obj: T,
  delimiter: D,
): DeepDelimiterKeys<T, D> {
  return deepTransformKeys(obj, (str) =>
    toDelimiterCase(str, delimiter),
  ) as never
}

/**
 * Recursively transforms the keys of an Record to kebab-case.
 * T: the type of the Record to transform.
 */
type DeepKebabKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepKebabKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepKebabKeys<V>[]
  : {
      [K in keyof T as KebabCase<Extract<K, string>>]: DeepKebabKeys<T[K]>
    }
/**
 * A strongly typed function that recursively transforms the keys of an object to kebab-case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example deepKebabKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { 'foo-bar': { 'fizz-buzz': true } }
 */
function deepKebabKeys<T>(obj: T): DeepKebabKeys<T> {
  return deepTransformKeys(obj, toKebabCase) as never
}

/**
 * Recursively transforms the keys of an Record to PascalCase.
 * T: the type of the Record to transform.
 */
type DeepPascalKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepPascalKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepPascalKeys<V>[]
  : {
      [K in keyof T as PascalCase<Extract<K, string>>]: DeepPascalKeys<T[K]>
    }
/**
 * A strongly typed function that recursively transforms the keys of an object to pascal case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example deepPascalKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { FooBar: { FizzBuzz: true } }
 */
function deepPascalKeys<T>(obj: T): DeepPascalKeys<T> {
  return deepTransformKeys(obj, toPascalCase) as never
}

/**
 * Recursively transforms the keys of an Record to snake_case.
 * T: the type of the Record to transform.
 */
type DeepSnakeKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepSnakeKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepSnakeKeys<V>[]
  : {
      [K in keyof T as SnakeCase<Extract<K, string>>]: DeepSnakeKeys<T[K]>
    }
/**
 * A strongly typed function that recursively transforms the keys of an object to snake_case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example deepSnakeKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { 'foo_bar': { 'fizz_buzz': true } }
 */
function deepSnakeKeys<T>(obj: T): DeepSnakeKeys<T> {
  return deepTransformKeys(obj, toSnakeCase) as never
}

export type {
  DeepCamelKeys,
  DeepConstantKeys,
  DeepDelimiterKeys,
  DeepKebabKeys,
  DeepPascalKeys,
  DeepSnakeKeys,
}
export {
  deepCamelKeys,
  deepConstantKeys,
  deepDelimiterKeys,
  deepKebabKeys,
  deepPascalKeys,
  deepSnakeKeys,
  deepTransformKeys,
}
