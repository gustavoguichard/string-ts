import { transformKeys } from './transform-keys.js'
import { type CamelCase, toCamelCase } from '../casing/to-camel-case.js'

/**
 * Shallowly transforms the keys of an Record to camelCase.
 * T: the type of the Record to transform.
 */
export type CamelKeys<T> = T extends []
  ? T
  : { [K in keyof T as CamelCase<Extract<K, string>>]: T[K] }
/**
 * A strongly typed function that shallowly transforms the keys of an object to camelCase. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example camelKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { fooBar: { 'fizz-buz': true } }
 */
export function camelKeys<T>(obj: T): CamelKeys<T> {
  return transformKeys(obj, toCamelCase) as never
}
