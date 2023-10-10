/**
 * Trims all whitespaces at the end of a string.
 * T: The string to trim.
 */
export type TrimEnd<T extends string> = T extends `${infer rest} `
  ? TrimEnd<rest>
  : T
/**
 * A strongly-typed version of `String.prototype.trimEnd`.
 * @param str the string to trim.
 * @returns the trimmed string in both type level and runtime.
 * @example trimEnd(' hello world ') // ' hello world'
 */
export function trimEnd<T extends string>(str: T) {
  return str.trimEnd() as TrimEnd<T>
}
