import { type SnakeCase, snakeCase } from '../word-case/snake-case.js'
import { transformKeys } from './transform-keys.js'

/**
 * Shallowly transforms the keys of a Record to snake_case.
 * T: the type of the Record to transform.
 */
export type SnakeKeys<T> = T extends []
  ? T
  : { [K in keyof T as SnakeCase<Extract<K, string>>]: T[K] }
/**
 * A strongly typed function that shallowly the keys of an object to snake_case. The transformation is done both at runtime and type level.
 * @param obj the object to transform.
 * @returns the transformed object.
 * @example snakeKeys({ 'foo-bar': { 'fizz-buzz': true } }) // { 'foo_bar': { 'fizz-buzz': true } }
 */
export function snakeKeys<T>(obj: T): SnakeKeys<T> {
  return transformKeys(obj, snakeCase) as never
}
