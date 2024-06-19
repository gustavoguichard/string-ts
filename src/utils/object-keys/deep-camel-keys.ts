import { type CamelCase, camelCase } from '../word-case/camel-case.js'
import { deepTransformKeys } from './deep-transform-keys.js'

/**
 * Recursively transforms the keys of a Record to camelCase.
 * T: the type of the Record to transform.
 */
export type DeepCamelKeys<T> = T extends [any, ...any]
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
export function deepCamelKeys<T>(obj: T): DeepCamelKeys<T> {
  return deepTransformKeys(obj, camelCase) as never
}
