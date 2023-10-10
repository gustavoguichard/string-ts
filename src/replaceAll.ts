/**
 * Replaces all the occurrences of a string with another string.
 * sentence: The sentence to replace.
 * lookup: The lookup string to be replaced.
 * replacement: The replacement string.
 */
export type ReplaceAll<
  sentence extends string,
  lookup extends string | RegExp,
  replacement extends string = '',
> = lookup extends string
  ? sentence extends `${infer rest}${lookup}${infer rest2}`
    ? `${rest}${replacement}${ReplaceAll<rest2, lookup, replacement>}`
    : sentence
  : string

/**
 * A strongly-typed version of `String.prototype.replaceAll`.
 * @param sentence the sentence to replace.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the replaced string in both type level and runtime.
 * @example replaceAll('hello world', 'l', '1') // 'he11o wor1d'
 */
export function replaceAll<
  T extends string,
  S extends string | RegExp,
  R extends string = '',
>(sentence: T, lookup: S, replacement: R = '' as R) {
  // Only supported in ES2021+
  if (typeof sentence.replaceAll === 'function') {
    return sentence.replaceAll(lookup, replacement) as ReplaceAll<T, S, R>
  }

  const regex = new RegExp(lookup, 'g')
  return sentence.replace(regex, replacement) as ReplaceAll<T, S, R>
}
