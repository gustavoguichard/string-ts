import { type KebabCase, toKebabCase } from '../casing/to-kebab-case.js'
import { deepTransformKeys } from './deep-transform-keys.js'

/**
 * Recursively transforms the keys of an Record to kebab-case.
 * T: the type of the Record to transform.
 */
export type DeepKebabKeys<T> = T extends [any, ...any]
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
export function deepKebabKeys<T>(obj: T): DeepKebabKeys<T> {
  return deepTransformKeys(obj, toKebabCase) as never
}
