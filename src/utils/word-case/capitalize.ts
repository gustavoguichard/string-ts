import { charAt } from '../../native/char-at.js'
import { join } from '../../native/join.js'
import { slice } from '../../native/slice.js'
import { toUpperCase } from '../../native/to-upper-case.js'

/**
 * Capitalizes the first letter of a string. This is a runtime counterpart of `Capitalize<T>` from `src/types.d.ts`.
 * @param str the string to capitalize.
 * @returns the capitalized string.
 * @example capitalize('hello world') // 'Hello world'
 */
export function capitalize<T extends string>(str: T) {
  return join([toUpperCase(charAt(str, 0)), slice(str, 1)]) as Capitalize<T>
}
