import { transformKeys } from './transform-keys.js'
import {
  type DelimiterCase,
  toDelimiterCase,
} from '../word-case/to-delimiter-case.js'

/**
 * Shallowly transforms the keys of an Record to a custom delimiter case.
 * T: the type of the Record to transform.
 * D: the delimiter to use.
 */
export type DelimiterKeys<T, D extends string> = T extends []
  ? T
  : { [K in keyof T as DelimiterCase<Extract<K, string>, D>]: T[K] }
/**
 * A strongly typed function that shallowly transforms the keys of an object to a custom delimiter case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @param delimiter the delimiter to use.
 * @returns the transformed object.
 * @example delimiterKeys({ 'foo-bar': { 'fizz-buzz': true } }, '.') // { 'foo.bar': { 'fizz.buzz': true } }
 */
export function delimiterKeys<T, D extends string>(
  obj: T,
  delimiter: D,
): DelimiterKeys<T, D> {
  return transformKeys(obj, (str) => toDelimiterCase(str, delimiter)) as never
}
