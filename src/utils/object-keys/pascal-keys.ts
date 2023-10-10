import { type PascalCase, toPascalCase } from '../word-case/to-pascal-case.js'
import { transformKeys } from './transform-keys.js'

/**
 * Shallowly transforms the keys of an Record to PascalCase.
 * T: the type of the Record to transform.
 */
export type PascalKeys<T> = T extends []
  ? T
  : { [K in keyof T as PascalCase<Extract<K, string>>]: T[K] }
/**
 * A strongly typed function that shallowly transforms the keys of an object to pascal case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example pascalKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { FooBar: { 'fizz-buzz': true } }
 */
export function pascalKeys<T>(obj: T): PascalKeys<T> {
  return transformKeys(obj, toPascalCase) as never
}
