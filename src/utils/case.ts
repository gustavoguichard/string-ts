/**
 * Uncapitalizes if string literal, else string
 */
export type Uncap<T extends string> = string extends T
  ? string
  : Uncapitalize<T>

/**
 * Lowercases if string literal, else string
 */
export type Lower<T extends string> = string extends T ? string : Lowercase<T>

/**
 * Uppercases if string literal, else string
 */
export type Upper<T extends string> = string extends T ? string : Uppercase<T>

/**
 * Capitalizes if string literal, else string
 */
export type Cap<T extends string> = string extends T ? string : Capitalize<T>
