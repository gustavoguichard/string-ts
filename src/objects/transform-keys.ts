import { typeOf } from '../internal/internals.js'

/**
 * This function is used to shallowly transform the keys of an object.
 * It will only be transformed at runtime, so it's not type safe.
 * @param obj the object to transform.
 * @param transform the function to transform the keys from string to string.
 * @returns the transformed object.
 * @example transformKeys({ 'foo-bar': { 'fizz-buzz': true } }, toCamelCase)
 * // { fooBar: { 'fizz-buzz': true } }
 */
export function transformKeys<T>(obj: T, transform: (s: string) => string): T {
  if (typeOf(obj) !== 'object') return obj

  const res = {} as T
  for (const key in obj) {
    res[transform(key) as keyof T] = obj[key]
  }
  return res
}
