import { join } from './join.js'
import type { Join } from './join.js'

/**
 * Concatenates a tuple of strings.
 * T: The tuple of strings to concatenate.
 */
export type Concat<T extends string[]> = Join<T>

/**
 * A strongly-typed version of `String.prototype.concat`.
 * @param strings the tuple of strings to concatenate.
 * @returns the concatenated string in both type level and runtime.
 * @example concat('a', 'bc', 'def') // 'abcdef'
 */
export function concat<T extends string[]>(...strings: T): Concat<T> {
  return join(strings)
}
