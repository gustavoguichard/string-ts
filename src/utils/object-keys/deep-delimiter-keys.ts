import {
  type DelimiterCase,
  delimiterCase,
} from '../word-case/delimiter-case.js'
import { deepTransformKeys } from './deep-transform-keys.js'

/**
 * Recursively transforms the keys of a Record to a custom delimiter case.
 * T: the type of the Record to transform.
 * D: the delimiter to use.
 */
export type DeepDelimiterKeys<T, D extends string> = T extends [any, ...any]
  ? { [I in keyof T]: DeepDelimiterKeys<T[I], D> }
  : T extends (infer V)[]
    ? DeepDelimiterKeys<V, D>[]
    : {
        [K in keyof T as DelimiterCase<
          Extract<K, string>,
          D
        >]: DeepDelimiterKeys<T[K], D>
      }
/**
 * A strongly typed function that recursively transforms the keys of an object to a custom delimiter case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @param delimiter the delimiter to use.
 * @returns the transformed object.
 * @example deepDelimiterKeys({ 'foo-bar': { 'fizz-buzz': true } }, '.') // { 'foo.bar': { 'fizz.buzz': true } }
 */
export function deepDelimiterKeys<T, D extends string>(
  obj: T,
  delimiter: D,
): DeepDelimiterKeys<T, D> {
  return deepTransformKeys(obj, (str) => delimiterCase(str, delimiter)) as never
}
