/**
 * Splits a string into an array of substrings.
 * T: The string to split.
 * delimiter: The delimiter.
 */
export type Split<
  T,
  delimiter extends string = '',
> = T extends `${infer first}${delimiter}${infer rest}`
  ? [first, ...Split<rest, delimiter>]
  : T extends ''
  ? []
  : [T]
/**
 * A strongly-typed version of `String.prototype.split`.
 * @param str the string to split.
 * @param delimiter the delimiter.
 * @returns the splitted string in both type level and runtime.
 * @example split('hello world', ' ') // ['hello', 'world']
 */
export function split<T extends string, D extends string = ''>(
  str: T,
  delimiter: D = '' as D,
) {
  return str.split(delimiter) as Split<T, D>
}
