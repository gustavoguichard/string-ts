import type { IsSeparator } from './separators.js'
import type { IsLetter } from './letters.js'
import type { IsDigit } from './numbers.js'

/**
 * Checks if the given character is a special character.
 * E.g. not a letter, number, or separator.
 */
export type IsSpecial<T extends string> = string extends T
  ? boolean
  : IsLetter<T> extends true
  ? false
  : IsDigit<T> extends true
  ? false
  : IsSeparator<T> extends true
  ? false
  : true
