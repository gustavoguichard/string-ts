export type Whitespace =
  | ' '
  | '\t'
  | '\n'
  | '\r'
  | '\v'
  | '\f'
  | '\u00A0'
  | '\uFEFF'

/**
 * Trims all whitespaces at the start of a string.
 * T: The string to trim.
 */
export type TrimStart<T extends string> = T extends `${Whitespace}${infer rest}`
  ? TrimStart<rest>
  : T
/**
 * A strongly-typed version of `String.prototype.trimStart`.
 * @param str the string to trim.
 * @returns the trimmed string in both type level and runtime.
 * @example trimStart(' hello world ') // 'hello world '
 */
export function trimStart<T extends string>(str: T) {
  return str.trimStart() as TrimStart<T>
}
