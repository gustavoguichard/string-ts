import type { TrimEnd } from './trim-end.js'
import type { TrimStart } from './trim-start.js'

/**
 * Trims all whitespaces at the start and end of a string.
 * T: The string to trim.
 */
export type Trim<T extends string> = TrimEnd<TrimStart<T>>

/**
 * A strongly-typed version of `String.prototype.trim`.
 * @param str the string to trim.
 * @returns the trimmed string in both type level and runtime.
 * @example trim(' hello world ') // 'hello world'
 */
export function trim<T extends string>(str: T) {
  return str.trim() as Trim<T>
}
