import type { IsStringLiteral } from '../../internal/literals.js'

export type UpperLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
export type UpperLetter = UpperLetters[number]
export type LowerLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]
export type LowerLetter = LowerLetters[number]

export type Letters = [...LowerLetters, ...UpperLetters]
export type Letter = LowerLetter | UpperLetter

// UTILITIES FOR DETECTING CHARS
/**
 * Checks if the given character is an upper case letter.
 */
export type IsUpper<T extends string> =
  IsStringLiteral<T> extends true
    ? T extends UpperLetter
      ? true
      : false
    : boolean

/**
 * Checks if the given character is a lower case letter.
 */
export type IsLower<T extends string> =
  IsStringLiteral<T> extends true
    ? T extends LowerLetter
      ? true
      : false
    : boolean

/**
 * Checks if the given character is a letter.
 */
export type IsLetter<T extends string> =
  IsStringLiteral<T> extends true ? (T extends Letter ? true : false) : boolean
