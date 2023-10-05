import type { Math } from './math'
import type { TupleOf } from './utils'

/**
 * Gets the character at the given index.
 * T: The string to get the character from.
 * index: The index of the character.
 */
type CharAt<T extends string, index extends number> = Split<T>[index]
/**
 * A strongly-typed version of `String.prototype.charAt`.
 * @param str the string to get the character from.
 * @param index the index of the character.
 * @returns the character in both type level and runtime.
 * @example charAt('hello world', 6) // 'w'
 */
function charAt<T extends string, I extends number>(
  str: T,
  index: I,
): CharAt<T, I> {
  return str.charAt(index)
}

/**
 * Concatenates a tuple of strings.
 * T: The tuple of strings to concatenate.
 */
type Concat<T extends string[]> = Join<T>

/**
 * A strongly-typed version of `String.prototype.concat`.
 * @param strings the tuple of strings to concatenate.
 * @returns the concatenated string in both type level and runtime.
 * @example concat('a', 'bc', 'def') // 'abcdef'
 */
function concat<T extends string[]>(...strings: T): Concat<T> {
  return join(strings)
}

/**
 * Checks if a string ends with another string.
 * T: The string to check.
 * S: The string to check against.
 * P: The position the search should end.
 */
type EndsWith<
  T extends string,
  S extends string,
  P extends number = Length<T>,
> = Math.IsNegative<P> extends false
  ? P extends Length<T>
    ? S extends Slice<T, Math.Subtract<Length<T>, Length<S>>, Length<T>>
      ? true
      : false
    : EndsWith<Slice<T, 0, P>, S, Length<T>> // P !== T.length, slice
  : false // P is negative, false

/**
 * A strongly-typed version of `String.prototype.endsWith`.
 * @param text the string to search.
 * @param search the string to search with.
 * @param position the index the search should end at.
 * @returns boolean, whether or not the text string ends with the search string.
 * @example endsWith('abc', 'c') // true
 */
function endsWith<
  T extends string,
  S extends string,
  P extends number = Length<T>,
>(text: T, search: S, position = text.length as P) {
  return text.endsWith(search, position) as EndsWith<T, S, P>
}

/**
 * Joins a tuple of strings with the given delimiter.
 * T: The tuple of strings to join.
 * delimiter: The delimiter.
 */
type Join<
  T extends readonly string[],
  delimiter extends string = '',
> = string[] extends T
  ? string // Avoid spending resources on a wide type
  : T extends readonly [
      infer first extends string,
      ...infer rest extends string[],
    ]
  ? rest extends []
    ? first
    : `${first}${delimiter}${Join<rest, delimiter>}`
  : ''

/**
 * A strongly-typed version of `Array.prototype.join`.
 * @param tuple the tuple of strings to join.
 * @param delimiter the delimiter.
 * @returns the joined string in both type level and runtime.
 * @example join(['hello', 'world'], '-') // 'hello-world'
 */
function join<const T extends readonly string[], D extends string = ''>(
  tuple: T,
  delimiter: D = '' as D,
) {
  return tuple.join(delimiter) as Join<T, D>
}

/**
 * Gets the length of a string.
 */
type Length<T extends string> = Split<T>['length']
/**
 * A strongly-typed version of `String.prototype.length`.
 * @param str the string to get the length from.
 * @returns the length of the string in both type level and runtime.
 * @example length('hello world') // 11
 */
function length<T extends string>(str: T) {
  return str.length as Length<T>
}

/**
 * Pads a string at the end with another string.
 * T: The string to pad.
 * times: The number of times to pad.
 * pad: The string to pad with.
 */
type PadEnd<
  T extends string,
  times extends number = 0,
  pad extends string = ' ',
> = Math.IsNegative<times> extends false
  ? Math.Subtract<times, Length<T>> extends infer missing extends number
    ? `${T}${Slice<Repeat<pad, missing>, 0, missing>}`
    : never
  : T
/**
 * A strongly-typed version of `String.prototype.padEnd`.
 * @param str the string to pad.
 * @param length the length to pad.
 * @param pad the string to pad with.
 * @returns the padded string in both type level and runtime.
 * @example padEnd('hello', 10, '=') // 'hello====='
 */
function padEnd<T extends string, N extends number = 0, U extends string = ' '>(
  str: T,
  length: N = 0 as N,
  pad: U = ' ' as U,
) {
  return str.padEnd(length, pad) as PadEnd<T, N, U>
}

/**
 * Pads a string at the start with another string.
 * T: The string to pad.
 * times: The number of times to pad.
 * pad: The string to pad with.
 */
type PadStart<
  T extends string,
  times extends number = 0,
  pad extends string = ' ',
> = Math.IsNegative<times> extends false
  ? Math.Subtract<times, Length<T>> extends infer missing extends number
    ? `${Slice<Repeat<pad, missing>, 0, missing>}${T}`
    : never
  : T
/**
 * A strongly-typed version of `String.prototype.padStart`.
 * @param str the string to pad.
 * @param length the length to pad.
 * @param pad the string to pad with.
 * @returns the padded string in both type level and runtime.
 * @example padStart('hello', 10, '=') // '=====hello'
 */
function padStart<
  T extends string,
  N extends number = 0,
  U extends string = ' ',
>(str: T, length: N = 0 as N, pad: U = ' ' as U) {
  return str.padStart(length, pad) as PadStart<T, N, U>
}

/**
 * Repeats a string N times.
 * T: The string to repeat.
 * N: The number of times to repeat.
 */
type Repeat<T extends string, times extends number = 0> = times extends 0
  ? ''
  : Math.IsNegative<times> extends false
  ? Join<TupleOf<times, T>>
  : never
/**
 * A strongly-typed version of `String.prototype.repeat`.
 * @param str the string to repeat.
 * @param times the number of times to repeat.
 * @returns the repeated string in both type level and runtime.
 * @example repeat('hello', 3) // 'hellohellohello'
 */
function repeat<T extends string, N extends number = 0>(
  str: T,
  times: N = 0 as N,
) {
  return str.repeat(times) as Repeat<T, N>
}

/**
 * Replaces the first occurrence of a string with another string.
 * sentence: The sentence to replace.
 * lookup: The lookup string to be replaced.
 * replacement: The replacement string.
 */
type Replace<
  sentence extends string,
  lookup extends string | RegExp,
  replacement extends string = '',
> = lookup extends string
  ? sentence extends `${infer rest}${lookup}${infer rest2}`
    ? `${rest}${replacement}${rest2}`
    : sentence
  : string
/**
 * A strongly-typed version of `String.prototype.replace`.
 * @param sentence the sentence to replace.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the replaced string in both type level and runtime.
 * @example replace('hello world', 'l', '1') // 'he1lo world'
 */
function replace<
  T extends string,
  S extends string | RegExp,
  R extends string = '',
>(sentence: T, lookup: S, replacement: R = '' as R) {
  return sentence.replace(lookup, replacement) as Replace<T, S, R>
}

/**
 * Replaces all the occurrences of a string with another string.
 * sentence: The sentence to replace.
 * lookup: The lookup string to be replaced.
 * replacement: The replacement string.
 */
type ReplaceAll<
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
function replaceAll<
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

/**
 * Slices a string from a startIndex to an endIndex.
 * T: The string to slice.
 * startIndex: The start index.
 * endIndex: The end index.
 */
type Slice<
  T extends string,
  startIndex extends number = 0,
  endIndex extends number = Length<T>,
> = T extends `${infer head}${infer rest}`
  ? startIndex extends 0
    ? endIndex extends 0
      ? ''
      : `${head}${Slice<
          rest,
          Math.Subtract<Math.GetPositiveIndex<T, startIndex>, 1>,
          Math.Subtract<Math.GetPositiveIndex<T, endIndex>, 1>
        >}`
    : `${Slice<
        rest,
        Math.Subtract<Math.GetPositiveIndex<T, startIndex>, 1>,
        Math.Subtract<Math.GetPositiveIndex<T, endIndex>, 1>
      >}`
  : ''
/**
 * A strongly-typed version of `String.prototype.slice`.
 * @param str the string to slice.
 * @param start the start index.
 * @param end the end index.
 * @returns the sliced string in both type level and runtime.
 * @example slice('hello world', 6) // 'world'
 */
function slice<
  T extends string,
  S extends number = 0,
  E extends number = Length<T>,
>(str: T, start: S = 0 as S, end: E = str.length as E) {
  return str.slice(start, end) as Slice<T, S, E>
}

/**
 * Splits a string into an array of substrings.
 * T: The string to split.
 * delimiter: The delimiter.
 */
type Split<
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
function split<T extends string, D extends string = ''>(
  str: T,
  delimiter: D = '' as D,
) {
  return str.split(delimiter) as Split<T, D>
}

/**
 * Checks if a string starts with another string.
 * T: The string to check.
 * S: The string to check against.
 * P: The position to start the search.
 */
type StartsWith<
  T extends string,
  S extends string,
  P extends number = 0,
> = Math.IsNegative<P> extends false
  ? P extends 0
    ? T extends `${S}${string}`
      ? true
      : false
    : StartsWith<Slice<T, P>, S, 0> // P is >0, slice
  : StartsWith<T, S, 0> // P is negative, ignore it

/**
 * A strongly-typed version of `String.prototype.startsWith`.
 * @param text the string to search.
 * @param search the string to search with.
 * @param position the index to start search at.
 * @returns boolean, whether or not the text string starts with the search string.
 * @example startsWith('abc', 'a') // true
 */
function startsWith<T extends string, S extends string, P extends number = 0>(
  text: T,
  search: S,
  position = 0 as P,
) {
  return text.startsWith(search, position) as StartsWith<T, S, P>
}

/**
 * Checks if a string includes another string.
 * T: The string to check.
 * S: The string to check against.
 * P: The position to start the search.
 */
type Includes<
  T extends string,
  S extends string,
  P extends number = 0,
> = Math.IsNegative<P> extends false
  ? P extends 0
    ? T extends `${string}${S}${string}`
      ? true
      : false
    : Includes<Slice<T, P>, S, 0> // P is >0, slice
  : Includes<T, S, 0> // P is negative, ignore it

/**
 * A strongly-typed version of `String.prototype.includes`.
 * @param text the string to search
 * @param search the string to search with
 * @param position the index to start search at
 * @returns boolean, whether or not the text contains the search string.
 * @example includes('abcde', 'bcd') // true
 */
function includes<T extends string, S extends string, P extends number = 0>(
  text: T,
  search: S,
  position = 0 as P,
) {
  return text.includes(search, position) as Includes<T, S, P>
}

/**
 * Trims all whitespaces at the start of a string.
 * T: The string to trim.
 */
type TrimStart<T extends string> = T extends ` ${infer rest}`
  ? TrimStart<rest>
  : T
/**
 * A strongly-typed version of `String.prototype.trimStart`.
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
 * A strongly-typed version of `String.prototype.trimEnd`.
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
 * A strongly-typed version of `String.prototype.trim`.
 * @param str the string to trim.
 * @returns the trimmed string in both type level and runtime.
 * @example trim(' hello world ') // 'hello world'
 */
function trim<T extends string>(str: T) {
  return str.trim() as Trim<T>
}

export type {
  CharAt,
  Concat,
  EndsWith,
  Includes,
  Join,
  Length,
  PadEnd,
  PadStart,
  Repeat,
  Replace,
  ReplaceAll,
  Slice,
  Split,
  StartsWith,
  TrimStart,
  TrimEnd,
  Trim,
}
export {
  charAt,
  concat,
  endsWith,
  includes,
  join,
  length,
  padEnd,
  padStart,
  repeat,
  replace,
  replaceAll,
  slice,
  split,
  startsWith,
  trim,
  trimStart,
  trimEnd,
}
