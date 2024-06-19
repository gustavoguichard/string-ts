import { transformKeys } from './transform-keys.js'
import { type ConstantCase, constantCase } from '../word-case/constant-case.js'

/**
 * Shallowly transforms the keys of a Record to CONSTANT_CASE.
 * T: the type of the Record to transform.
 */
export type ConstantKeys<T> = T extends []
  ? T
  : { [K in keyof T as ConstantCase<Extract<K, string>>]: T[K] }
/**
 * A strongly typed function that shallowly transforms the keys of an object to CONSTANT_CASE. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example constantKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { FOO_BAR: { 'fizz-buzz': true } }
 */
export function constantKeys<T>(obj: T): ConstantKeys<T> {
  return transformKeys(obj, constantCase) as never
}
