import { type KebabCase, toKebabCase } from '../casing/to-kebab-case.js'
import { transformKeys } from './transform-keys.js'

/**
 * Shallowly transforms the keys of an Record to kebab-case.
 * T: the type of the Record to transform.
 */
export type KebabKeys<T> = T extends []
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
export function kebabKeys<T>(obj: T): KebabKeys<T> {
  return transformKeys(obj, toKebabCase) as never
}
