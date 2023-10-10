export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

/**
 * Checks if the given character is a number.
 */
export type IsDigit<T extends string> = T extends Digit ? true : false
