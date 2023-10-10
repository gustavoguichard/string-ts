import { charAt } from './charAt.js'
import { join } from './join.js'
import { slice } from './slice.js'
import { toUpperCase } from './toUpperCase.js'

/**
 * Capitalizes the first letter of a string. This is a runtime counterpart of `Capitalize<T>` from `src/types.d.ts`.
 * @param str the string to capitalize.
 * @returns the capitalized string.
 * @example capitalize('hello world') // 'Hello world'
 */
export function capitalize<T extends string>(str: T): Capitalize<T> {
  return join([toUpperCase(charAt(str, 0)), slice(str, 1)])
}
