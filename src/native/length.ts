import type { Split } from './split.js'

/**
 * Gets the length of a string.
 */
export type Length<T extends string> = string extends T
  ? number
  : Split<T>['length']
/**
 * A strongly-typed version of `String.prototype.length`.
 * @param str the string to get the length from.
 * @returns the length of the string in both type level and runtime.
 * @example length('hello world') // 11
 */
export function length<T extends string>(str: T) {
  return str.length as Length<T>
}
