import { Is } from './utils'

/**
 * Joins a tuple of strings with the given delimiter.
 * T: The current tuple of strings.
 * delimiter: The delimiter.
 */
type Join<
  T extends string[],
  delimiter extends string = '',
> = string[] extends T
  ? string // Avoid spending resources on a wide type
  : T extends [infer first, ...infer rest]
  ? rest extends []
    ? first
    : `${Is<first, string>}${delimiter}${Join<Is<rest, string[]>, delimiter>}`
  : ''

/**
 * A strongly typed version of `Array.prototype.join`.
 * @param tuple the tuple of strings to join.
 * @param delimiter the delimiter.
 * @returns the joined string in both type level and runtime.
 * @example join(['hello', 'world'], '-') // 'hello-world'
 */
function join<T extends string[], D extends string = ''>(
  tuple: T,
  delimiter?: D,
) {
  return tuple.join(delimiter ?? ('' as const)) as Join<T, D>
}

/**
 * Replaces the first occurrence of a string with another string.
 * sentence: The current sentence.
 * lookup: The lookup string to be replaced.
 * replacement: The replacement string.
 */
type Replace<
  sentence extends string,
  lookup extends string,
  replacement extends string = '',
> = sentence extends `${infer rest}${lookup}${infer rest2}`
  ? `${rest}${replacement}${rest2}`
  : sentence

/**
 * A strongly typed version of `String.prototype.replace`.
 * @param sentence the sentence to replace.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the replaced string in both type level and runtime.
 * @example replace('hello world', 'l', '1') // 'he1lo world'
 */
function replace<T extends string, S extends string, R extends string = ''>(
  sentence: T,
  lookup: S,
  replacement?: R,
) {
  return sentence.replace(lookup, replacement ?? ('' as const)) as Replace<
    T,
    S,
    R
  >
}

/**
 * Replaces all the occurrences of a string with another string.
 * sentence: The current sentence.
 * lookup: The lookup string to be replaced.
 * replacement: The replacement string.
 */
type ReplaceAll<
  sentence extends string,
  lookup extends string,
  replacement extends string = '',
> = sentence extends `${infer rest}${lookup}${infer rest2}`
  ? `${rest}${replacement}${ReplaceAll<rest2, lookup, replacement>}`
  : sentence

/**
 * A strongly typed version of `String.prototype.replaceAll`.
 * @param sentence the sentence to replace.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the replaced string in both type level and runtime.
 * @example replaceAll('hello world', 'l', '1') // 'he11o wor1d'
 */
function replaceAll<T extends string, S extends string, R extends string = ''>(
  sentence: T,
  lookup: S,
  replacement?: R,
) {
  // Only supported in ES2021+
  return sentence.replaceAll(
    lookup,
    replacement ?? ('' as const),
  ) as ReplaceAll<T, S, R>
}

/**
 * Splits a string into an array of substrings.
 * T: The string to split.
 * delimiter: The delimiter.
 */
type Split<
  T,
  delimiter extends string,
> = T extends `${infer first}${delimiter}${infer rest}`
  ? [first, ...Split<rest, delimiter>]
  : [T]
/**
 * A strongly typed version of `String.prototype.split`.
 * @param str the string to split.
 * @param delimiter the delimiter.
 * @returns the splitted string in both type level and runtime.
 * @example split('hello world', ' ') // ['hello', 'world']
 */
function split<T extends string, D extends string = ''>(str: T, delimiter?: D) {
  return str.split(delimiter ?? ('' as const)) as Split<T, D>
}

/**
 * Trims all whitespaces at the start of a string.
 * T: The string to trim.
 */
type TrimStart<T extends string> = T extends ` ${infer rest}`
  ? TrimStart<rest>
  : T
/**
 * A strongly typed version of `String.prototype.trimStart`.
 * @param str the string to trim.
 * @returns the trimmed string in both type level and runtime.
 * @example trimStart(' hello world ') // 'hello world '
 */
function trimStart<T extends string>(str: T) {
  return str.trimStart() as TrimStart<T>
}

/**
 * Trims all whitespaces at the end of a string.
 * T: The string to trim.
 */
type TrimEnd<T extends string> = T extends `${infer rest} ` ? TrimEnd<rest> : T
/**
 * A strongly typed version of `String.prototype.trimEnd`.
 * @param str the string to trim.
 * @returns the trimmed string in both type level and runtime.
 * @example trimEnd(' hello world ') // ' hello world'
 */
function trimEnd<T extends string>(str: T) {
  return str.trimEnd() as TrimEnd<T>
}

/**
 * Trims all whitespaces at the start and end of a string.
 * T: The string to trim.
 */
type Trim<T extends string> = TrimEnd<TrimStart<T>>

/**
 * A strongly typed version of `String.prototype.trim`.
 * @param str the string to trim.
 * @returns the trimmed string in both type level and runtime.
 * @example trim(' hello world ') // 'hello world'
 */
function trim<T extends string>(str: T) {
  return str.trim() as Trim<T>
}

export type { Join, Replace, ReplaceAll, Split, TrimStart, TrimEnd, Trim }
export { join, replace, replaceAll, split, trim, trimStart, trimEnd }
