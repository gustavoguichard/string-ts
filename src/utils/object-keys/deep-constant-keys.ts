import { type ConstantCase, constantCase } from '../word-case/constant-case.js'
import { deepTransformKeys } from './deep-transform-keys.js'

/**
 * Recursively transforms the keys of an Record to CONSTANT_CASE.
 * T: the type of the Record to transform.
 */
export type DeepConstantKeys<T> = T extends [any, ...any]
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
export function deepConstantKeys<T>(obj: T): DeepConstantKeys<T> {
  return deepTransformKeys(obj, constantCase) as never
}
