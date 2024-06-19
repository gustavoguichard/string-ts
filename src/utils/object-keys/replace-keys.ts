import { transformKeys } from './transform-keys.js'
import { type Replace, replace } from '../../native/replace.js'

/**
 * Shallowly transforms the keys of a Record with `replace`.
 * T: the type of the Record to transform.
 */
export type ReplaceKeys<
  T,
  lookup extends string | RegExp,
  replacement extends string = '',
> = T extends []
  ? T
  : { [K in keyof T as Replace<Extract<K, string>, lookup, replacement>]: T[K] }
/**
 * A strongly typed function that shallowly transforms the keys of an object by running the `replace` method in every key. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the transformed object.
 * @example replaceKeys({ 'foo-bar': { 'fizz-buzz': true } }, 'f', 'b') // { booBar: { 'bizz-buz': true } }
 */
export function replaceKeys<
  T,
  S extends string | RegExp,
  R extends string = '',
>(obj: T, lookup: S, replacement: R = '' as R): ReplaceKeys<T, S, R> {
  return transformKeys(obj, (s) => replace(s, lookup, replacement)) as never
}
