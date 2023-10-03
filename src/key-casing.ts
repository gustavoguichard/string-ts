import {
  CamelCase,
  ConstantCase,
  DelimiterCase,
  KebabCase,
  PascalCase,
  SnakeCase,
  toCamelCase,
  toConstantCase,
  toDelimiterCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './casing'
import { typeOf } from './internals'
import { Is } from './utils'

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
 * This function is used to shallowly transform the keys of an object.
 * It will only be transformed at runtime, so it's not type safe.
 * @param obj the object to transform.
 * @param transform the function to transform the keys from string to string.
 * @returns the transformed object.
 * @example transformKeys({ 'foo-bar': { 'fizz-buzz': true } }, toCamelCase)
 * // { fooBar: { 'fizz-buzz': true } }
 */
function transformKeys<T>(obj: T, transform: (s: string) => string): T {
  if (typeOf(obj) !== 'object') return obj

  const res = {} as T
  for (const key in obj) {
    res[transform(key) as keyof T] = obj[key]
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
      [K in keyof T as CamelCase<Is<K, string>>]: DeepCamelKeys<T[K]>
    }
/**
 * Shallowly transforms the keys of an Record to camelCase.
 * T: the type of the Record to transform.
 */
type CamelKeys<T> = T extends []
  ? T
  : { [K in keyof T as CamelCase<Is<K, string>>]: T[K] }
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
 * A strongly typed function that shallowly transforms the keys of an object to camelCase. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example camelKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { fooBar: { 'fizz-buz': true } }
 */
function camelKeys<T>(obj: T): CamelKeys<T> {
  return transformKeys(obj, toCamelCase) as never
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
      [K in keyof T as PascalCase<Is<K, string>>]: DeepPascalKeys<T[K]>
    }
/**
 * Shallowly transforms the keys of an Record to PascalCase.
 * T: the type of the Record to transform.
 */
type PascalKeys<T> = T extends []
  ? T
  : { [K in keyof T as PascalCase<Is<K, string>>]: T[K] }
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
 * A strongly typed function that shallowly transforms the keys of an object to pascal case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example pascalKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { FooBar: { 'fizz-buzz': true } }
 */
function pascalKeys<T>(obj: T): PascalKeys<T> {
  return transformKeys(obj, toPascalCase) as never
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
      [K in keyof T as KebabCase<Is<K, string>>]: DeepKebabKeys<T[K]>
    }
/**
 * Shallowly transforms the keys of an Record to kebab-case.
 * T: the type of the Record to transform.
 */
type KebabKeys<T> = T extends []
  ? T
  : {
      [K in keyof T as KebabCase<Is<K, string>>]: T[K]
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
 * A strongly typed function that shallowly transforms the keys of an object to kebab-case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example kebabKeys({ fooBar: { fizzBuzz: true } }) // { 'foo-bar': { fizzBuzz: true } }
 */
function kebabKeys<T>(obj: T): KebabKeys<T> {
  return transformKeys(obj, toKebabCase) as never
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
      [K in keyof T as SnakeCase<Is<K, string>>]: DeepSnakeKeys<T[K]>
    }
/**
 * Shallowly transforms the keys of an Record to snake_case.
 * T: the type of the Record to transform.
 */
type SnakeKeys<T> = T extends []
  ? T
  : { [K in keyof T as SnakeCase<Is<K, string>>]: T[K] }

/**
 * A strongly typed function that recursively transforms the keys of an object to snake_case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example deepSnakeKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { 'foo_bar': { 'fizz_buzz': true } }
 */
function deepSnakeKeys<T>(obj: T): DeepSnakeKeys<T> {
  return deepTransformKeys(obj, toSnakeCase) as never
}
/**
 * A strongly typed function that shallowly the keys of an object to snake_case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example snakeKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { 'foo_bar': { 'fizz-buzz': true } }
 */
function snakeKeys<T>(obj: T): SnakeKeys<T> {
  return transformKeys(obj, toSnakeCase) as never
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
      [K in keyof T as ConstantCase<Is<K, string>>]: DeepConstantKeys<T[K]>
    }
/**
 * Shallowly transforms the keys of an Record to CONSTANT_CASE.
 * T: the type of the Record to transform.
 */
type ConstantKeys<T> = T extends []
  ? T
  : { [K in keyof T as ConstantCase<Is<K, string>>]: T[K] }
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
 * A strongly typed function that shallowly transforms the keys of an object to CONSTANT_CASE. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example constantKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { FOO_BAR: { 'fizz-buzz': true } }
 */
function constantKeys<T>(obj: T): ConstantKeys<T> {
  return transformKeys(obj, toConstantCase) as never
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
      [K in keyof T as DelimiterCase<Is<K, string>, D>]: DeepDelimiterKeys<
        T[K],
        D
      >
    }
/**
 * Shallowly transforms the keys of an Record to a custom delimiter case.
 * T: the type of the Record to transform.
 * D: the delimiter to use.
 */
type DelimiterKeys<T, D extends string> = T extends []
  ? T
  : { [K in keyof T as DelimiterCase<Is<K, string>, D>]: T[K] }
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
 * A strongly typed function that shallowly transforms the keys of an object to a custom delimiter case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @param delimiter the delimiter to use.
 * @returns the transformed object.
 * @example delimiterKeys({ 'foo-bar': { 'fizz-buzz': true } }, '.') // { 'foo.bar': { 'fizz.buzz': true } }
 */
function delimiterKeys<T, D extends string>(
  obj: T,
  delimiter: D,
): DelimiterKeys<T, D> {
  return transformKeys(obj, (str) => toDelimiterCase(str, delimiter)) as never
}

export type {
  CamelKeys,
  ConstantKeys,
  DeepCamelKeys,
  DeepConstantKeys,
  DeepDelimiterKeys,
  DeepKebabKeys,
  DeepPascalKeys,
  DeepSnakeKeys,
  DelimiterKeys,
  KebabKeys,
  PascalKeys,
  SnakeKeys,
}
export {
  camelKeys,
  constantKeys,
  deepCamelKeys,
  deepConstantKeys,
  deepDelimiterKeys,
  deepKebabKeys,
  deepPascalKeys,
  deepSnakeKeys,
  deepTransformKeys,
  delimiterKeys,
  kebabKeys,
  pascalKeys,
  snakeKeys,
  transformKeys,
}
