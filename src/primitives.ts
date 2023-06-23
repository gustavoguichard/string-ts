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

export type { Join, Replace, ReplaceAll }
export { join, replace, replaceAll }
