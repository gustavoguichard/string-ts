import { charAt } from '../../native/char-at.js'
import { join } from '../../native/join.js'
import { slice } from '../../native/slice.js'
import { toLowerCase } from '../../native/to-lower-case.js'

/**
 * Uncapitalizes the first letter of a string. This is a runtime counterpart of `Uncapitalize<T>` from `src/types.d.ts`.
 * @param str the string to uncapitalize.
 * @returns the uncapitalized string.
 * @example uncapitalize('Hello world') // 'hello world'
 */
export function uncapitalize<T extends string>(str: T) {
  return join([toLowerCase(charAt(str, 0)), slice(str, 1)]) as Uncapitalize<T>
}
