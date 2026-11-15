import type { IsStringLiteral } from '../internal/literals.js'

type _FormatDollarTail<
  tail extends string,
  matched extends string,
  before extends string,
  after extends string,
> = tail extends `$${infer rest}`
  ? ['$', rest]
  : tail extends `&${infer rest}`
    ? [matched, rest]
    : tail extends `\`${infer rest}`
      ? [before, rest]
      : tail extends `'${infer rest}`
        ? [after, rest]
        : ['$', tail]

/**
 * Formats a replacement string according to `String.prototype.replace` / `replaceAll`
 * special `$` patterns (`$$`, `$&`, `` $` ``, `$'`).
 */
export type FormatReplacement<
  replacement extends string,
  matched extends string,
  before extends string,
  after extends string,
> = replacement extends `${infer head}$${infer tail}`
  ? _FormatDollarTail<tail, matched, before, after> extends [
      infer value extends string,
      infer rest extends string,
    ]
    ? `${head}${value}${FormatReplacement<rest, matched, before, after>}`
    : never
  : replacement

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
  ? IsStringLiteral<lookup | sentence | replacement> extends true
    ? sentence extends `${infer rest}${lookup}${infer rest2}`
      ? `${rest}${FormatReplacement<replacement, lookup, rest, rest2>}${rest2}`
      : sentence
    : string
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
