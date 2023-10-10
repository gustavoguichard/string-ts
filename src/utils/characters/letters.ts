// prettier-ignore
type UpperChars = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type LowerChars = Lowercase<UpperChars>

// UTILITIES FOR DETECTING CHARS
/**
 * Checks if the given character is an upper case letter.
 */
export type IsUpper<T extends string> = T extends UpperChars ? true : false

/**
 * Checks if the given character is a lower case letter.
 */
export type IsLower<T extends string> = T extends LowerChars ? true : false

/**
 * Checks if the given character is a letter.
 */
export type IsLetter<T extends string> = IsUpper<T> extends true
  ? true
  : IsLower<T> extends true
  ? true
  : false
