import { type PascalCase, toPascalCase } from '../word-case/to-pascal-case.js'
import { deepTransformKeys } from './deep-transform-keys.js'

/**
 * Recursively transforms the keys of an Record to PascalCase.
 * T: the type of the Record to transform.
 */
export type DeepPascalKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepPascalKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepPascalKeys<V>[]
  : {
      [K in keyof T as PascalCase<Extract<K, string>>]: DeepPascalKeys<T[K]>
    }
/**
 * A strongly typed function that recursively transforms the keys of an object to pascal case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example deepPascalKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { FooBar: { FizzBuzz: true } }
 */
export function deepPascalKeys<T>(obj: T): DeepPascalKeys<T> {
  return deepTransformKeys(obj, toPascalCase) as never
}
