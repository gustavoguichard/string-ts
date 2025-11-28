import type { IsStringLiteral } from '../../internal/literals.js'

export type Digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export type Digit = Digits[number]

/**
 * Checks if the given character is a number.
 */
export type IsDigit<T extends string> =
  IsStringLiteral<T> extends true ? (T extends Digit ? true : false) : boolean
