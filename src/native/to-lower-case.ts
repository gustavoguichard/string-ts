import type { LowercaseSTS } from '../internal/intrinsic.js'

/**
 * This function is a strongly-typed counterpart of String.prototype.toLowerCase.
 * @param str the string to make lowercase.
 * @returns the lowercased string.
 * @example toLowerCase('HELLO WORLD') // 'hello world'
 */
export function toLowerCase<T extends string>(str: T) {
  return str.toLowerCase() as LowercaseSTS<T>
}
