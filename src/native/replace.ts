/**
 * Replaces the first occurrence of a string with another string.
 * sentence: The sentence to replace.
 * lookup: The lookup string to be replaced.
 * replacement: The replacement string.
 */
export type Replace<
  sentence extends string,
  lookup extends string | RegExp,
  replacement extends string = '',
> = lookup extends string
  ? string extends lookup | sentence | replacement
    ? string
    : sentence extends `${infer rest}${lookup}${infer rest2}`
    ? `${rest}${replacement}${rest2}`
    : sentence
  : string // Regex used, can't preserve literal
/**
 * A strongly-typed version of `String.prototype.replace`.
 * @param sentence the sentence to replace.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the replaced string in both type level and runtime.
 * @example replace('hello world', 'l', '1') // 'he1lo world'
 */
export function replace<
  T extends string,
  S extends string | RegExp,
  R extends string = '',
>(sentence: T, lookup: S, replacement: R = '' as R) {
  return sentence.replace(lookup, replacement) as Replace<T, S, R>
}
