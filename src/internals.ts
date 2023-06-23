import { capitalize } from './casing'
import { Is } from './utils'

/**
 * This is an enhanced version of the typeof operator to check the type of more complex values.
 * @param t the value to be checked
 * @returns the type of the value
 */
function typeOf(t: unknown) {
  return Object.prototype.toString
    .call(t)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase() as
    | 'array'
    | 'arraybuffer'
    | 'bigint'
    | 'blob'
    | 'boolean'
    | 'formdata'
    | 'function'
    | 'null'
    | 'number'
    | 'object'
    | 'readablestream'
    | 'string'
    | 'symbol'
    | 'undefined'
    | 'url'
    | 'urlsearchparams'
}

/**
 * Removes all the elements matching the given condition from a tuple.
 */
type Drop<tuple, cond, output extends any[] = []> = tuple extends [
  infer first,
  ...infer rest,
]
  ? Drop<rest, cond, first extends cond ? output : [...output, first]>
  : output

/**
 * Removes the given suffix from a sentence.
 */
type DropSuffix<
  sentence extends string,
  suffix extends string,
> = sentence extends `${infer rest}${suffix}` ? rest : sentence

/**
 * Capitalizes all the words in a tuple of strings. This works in both runtime and type level.
 * @param str the tuple of strings to capitalize.
 * @returns the capitalized tuple of strings.
 */
type CapitalizeAll<T extends string[]> = T extends [infer First, ...infer Rest]
  ? [Capitalize<Is<First, string>>, ...CapitalizeAll<Is<Rest, string[]>>]
  : T
function capitalizeAll<T extends string[]>(str: T) {
  return str.map(capitalize) as CapitalizeAll<T>
}

/**
 * Lowercases all the words in a tuple of strings. This works in both runtime and type level.
 * @param str the tuple of strings to lowercase.
 * @returns the lowercased tuple of strings.
 */
type LowercaseAll<T extends string[]> = T extends [infer First, ...infer Rest]
  ? [Lowercase<Is<First, string>>, ...LowercaseAll<Is<Rest, string[]>>]
  : T
function lowercaseAll<T extends string[]>(str: T) {
  return str.map((x) => x.toLowerCase()) as LowercaseAll<T>
}

export type { CapitalizeAll, LowercaseAll, Drop, DropSuffix }
export { typeOf, capitalizeAll, lowercaseAll }
