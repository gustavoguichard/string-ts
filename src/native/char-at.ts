import type { Split } from './split.js'

/**
 * Gets the character at the given index.
 * T: The string to get the character from.
 * index: The index of the character.
 */
export type CharAt<T extends string, index extends number> = Split<T>[index]
/**
 * A strongly-typed version of `String.prototype.charAt`.
 * @param str the string to get the character from.
 * @param index the index of the character.
 * @returns the character in both type level and runtime.
 * @example charAt('hello world', 6) // 'w'
 */
export function charAt<T extends string, I extends number>(
  str: T,
  index: I,
): CharAt<T, I> {
  return str.charAt(index)
}
