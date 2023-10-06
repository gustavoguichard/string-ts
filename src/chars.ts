import type { IsSeparator } from './separators'

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// prettier-ignore
type UpperChars = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type LowerChars = Lowercase<UpperChars>

// UTILITIES FOR DETECTING CHARS
/**
 * Checks if the given character is an upper case letter.
 */
type IsUpper<T extends string> = T extends UpperChars ? true : false

/**
 * Checks if the given character is a letter.
 */
type IsLetter<T extends string> = IsUpper<T> extends true
  ? true
  : IsLower<T> extends true
  ? true
  : false

/**
 * Checks if the given character is a lower case letter.
 */
type IsLower<T extends string> = T extends LowerChars ? true : false

/**
 * Checks if the given character is a number.
 */
type IsDigit<T extends string> = T extends Digit ? true : false

/**
 * Checks if the given character is a special character.
 * E.g. not a letter, number, or separator.
 */
type IsSpecial<T extends string> = IsLetter<T> extends true
  ? false
  : IsDigit<T> extends true
  ? false
  : IsSeparator<T> extends true
  ? false
  : true

export type { Digit, IsDigit, IsLetter, IsLower, IsSpecial, IsUpper }
