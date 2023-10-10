import { type SnakeCase, toSnakeCase } from '../casing/to-snake-case.js'
import { deepTransformKeys } from './deep-transform-keys.js'

/**
 * Recursively transforms the keys of an Record to snake_case.
 * T: the type of the Record to transform.
 */
export type DeepSnakeKeys<T> = T extends [any, ...any]
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
export function deepSnakeKeys<T>(obj: T): DeepSnakeKeys<T> {
  return deepTransformKeys(obj, toSnakeCase) as never
}
