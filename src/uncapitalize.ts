import { charAt } from './charAt.js'
import { join } from './join.js'
import { slice } from './slice.js'
import { toLowerCase } from './toLowerCase.js'

/**
 * Uncapitalizes the first letter of a string. This is a runtime counterpart of `Uncapitalize<T>` from `src/types.d.ts`.
 * @param str the string to uncapitalize.
 * @returns the uncapitalized string.
 * @example uncapitalize('Hello world') // 'hello world'
 */
export function uncapitalize<T extends string>(str: T): Uncapitalize<T> {
  return join([toLowerCase(charAt(str, 0)), slice(str, 1)])
}
