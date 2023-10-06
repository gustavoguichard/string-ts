import { capitalize, toLowerCase, toUpperCase } from './casing'

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
 * PascalCases all the words in a tuple of strings
 */
type PascalCaseAll<T extends string[]> = T extends [
  infer head extends string,
  ...infer rest extends string[],
]
  ? [Capitalize<Lowercase<head>>, ...PascalCaseAll<rest>]
  : T
function pascalCaseAll<T extends string[]>(words: T) {
  return words.map((v) => capitalize(toLowerCase(v))) as PascalCaseAll<T>
}

/**
 * LowerCases all the words in a tuple of strings
 */
type LowerCaseAll<T extends string[]> = T extends [
  infer head extends string,
  ...infer rest extends string[],
]
  ? [Lowercase<head>, ...LowerCaseAll<rest>]
  : T
function lowerCaseAll<T extends string[]>(words: T) {
  return words.map(toLowerCase) as LowerCaseAll<T>
}

/**
 * UpperCases all the words in a tuple of strings
 */
type UpperCaseAll<T extends string[]> = T extends [
  infer head extends string,
  ...infer rest extends string[],
]
  ? [Uppercase<head>, ...UpperCaseAll<rest>]
  : T
function upperCaseAll<T extends string[]>(words: T) {
  return words.map(toUpperCase) as UpperCaseAll<T>
}

export type { Drop, DropSuffix, LowerCaseAll, PascalCaseAll, UpperCaseAll }
export { lowerCaseAll, pascalCaseAll, typeOf, upperCaseAll }
