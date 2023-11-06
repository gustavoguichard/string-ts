import type { IsSeparator } from './separators.js'
import type { IsLetter } from './letters.js'
import type { IsDigit } from './numbers.js'
import type { IsStringLiteral } from '../../internal/literals.js'

/**
 * Checks if the given character is a special character.
 * E.g. not a letter, number, or separator.
 */
export type IsSpecial<T extends string> = IsStringLiteral<T> extends true
  ? IsLetter<T> extends true
    ? false
    : IsDigit<T> extends true
    ? false
    : IsSeparator<T> extends true
    ? false
    : true
  : boolean
