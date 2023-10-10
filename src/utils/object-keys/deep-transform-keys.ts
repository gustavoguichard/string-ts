import { typeOf } from '../../internal/internals.js'

/**
 * This function is used to transform the keys of an object deeply.
 * It will only be transformed at runtime, so it's not type safe.
 * @param obj the object to transform.
 * @param transform the function to transform the keys from string to string.
 * @returns the transformed object.
 * @example deepTransformKeys({ 'foo-bar': { 'fizz-buzz': true } }, toCamelCase)
 * // { fooBar: { fizzBuzz: true } }
 */
export function deepTransformKeys<T>(
  obj: T,
  transform: (s: string) => string,
): T {
  if (!['object', 'array'].includes(typeOf(obj))) return obj

  if (Array.isArray(obj)) {
    return obj.map((x) => deepTransformKeys(x, transform)) as T
  }
  const res = {} as T
  for (const key in obj) {
    res[transform(key) as keyof T] = deepTransformKeys(obj[key], transform)
  }
  return res
}
