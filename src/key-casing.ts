import type {
  CamelCase,
  ConstantCase,
  DelimiterCase,
  KebabCase,
  PascalCase,
  SnakeCase,
} from './casing'
import {
  toCamelCase,
  toConstantCase,
  toDelimiterCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './casing'
import { typeOf } from './internals'

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
 * Shallowly transforms the keys of an Record to camelCase.
 * T: the type of the Record to transform.
 */
type CamelKeys<T> = T extends []
  ? T
  : { [K in keyof T as CamelCase<Extract<K, string>>]: T[K] }
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
 * Shallowly transforms the keys of an Record to CONSTANT_CASE.
 * T: the type of the Record to transform.
 */
type ConstantKeys<T> = T extends []
  ? T
  : { [K in keyof T as ConstantCase<Extract<K, string>>]: T[K] }
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
 * Shallowly transforms the keys of an Record to a custom delimiter case.
 * T: the type of the Record to transform.
 * D: the delimiter to use.
 */
type DelimiterKeys<T, D extends string> = T extends []
  ? T
  : { [K in keyof T as DelimiterCase<Extract<K, string>, D>]: T[K] }
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

/**
 * Shallowly transforms the keys of an Record to kebab-case.
 * T: the type of the Record to transform.
 */
type KebabKeys<T> = T extends []
  ? T
  : {
      [K in keyof T as KebabCase<Extract<K, string>>]: T[K]
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
 * Shallowly transforms the keys of an Record to PascalCase.
 * T: the type of the Record to transform.
 */
type PascalKeys<T> = T extends []
  ? T
  : { [K in keyof T as PascalCase<Extract<K, string>>]: T[K] }
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
 * Shallowly transforms the keys of an Record to snake_case.
 * T: the type of the Record to transform.
 */
type SnakeKeys<T> = T extends []
  ? T
  : { [K in keyof T as SnakeCase<Extract<K, string>>]: T[K] }
/**
 * A strongly typed function that shallowly the keys of an object to snake_case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example snakeKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { 'foo_bar': { 'fizz-buzz': true } }
 */
function snakeKeys<T>(obj: T): SnakeKeys<T> {
  return transformKeys(obj, toSnakeCase) as never
}

export type {
  CamelKeys,
  ConstantKeys,
  DelimiterKeys,
  KebabKeys,
  PascalKeys,
  SnakeKeys,
}
export {
  camelKeys,
  constantKeys,
  delimiterKeys,
  kebabKeys,
  pascalKeys,
  snakeKeys,
  transformKeys,
}
