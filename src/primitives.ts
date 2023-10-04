import type { Math } from './math'

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
  delimiter?: D,
) {
  return tuple.join(delimiter ?? ('' as const)) as Join<T, D>
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
 * Replaces the first occurrence of a string with another string.
 * sentence: The sentence to replace.
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
 * A strongly-typed version of `String.prototype.replace`.
 * @param sentence the sentence to replace.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the replaced string in both type level and runtime.
 * @example replace('hello world', 'l', '1') // 'he1lo world'
 */
function replace<T extends string, S extends string, R extends string = ''>(
  sentence: T,
  lookup: S,
  replacement: R = '' as R,
) {
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
  lookup extends string,
  replacement extends string = '',
> = sentence extends `${infer rest}${lookup}${infer rest2}`
  ? `${rest}${replacement}${ReplaceAll<rest2, lookup, replacement>}`
  : sentence

/**
 * A strongly-typed version of `String.prototype.replaceAll`.
 * @param sentence the sentence to replace.
 * @param lookup the lookup string to be replaced.
 * @param replacement the replacement string.
 * @returns the replaced string in both type level and runtime.
 * @example replaceAll('hello world', 'l', '1') // 'he11o wor1d'
 */
function replaceAll<T extends string, S extends string, R extends string = ''>(
  sentence: T,
  lookup: S,
  replacement: R = '' as R,
) {
  // Only supported in ES2021+
  if (typeof sentence.replaceAll === 'function') {
    return sentence.replaceAll(lookup, replacement) as ReplaceAll<T, S, R>
  }

  const regex = new RegExp(lookup, 'g')
  return sentence.replace(regex, replacement) as ReplaceAll<T, S, R>
}

// TODO: this is not equivalent to the native slice but it is as far as I got with Type level arithmetic. When the startIndex is negative, the endIndex is gonna be considered as undefined.
/**
 * Slices a string from a startIndex to an endIndex.
 * T: The string to slice.
 * startIndex: The start index.
 * endIndex: The end index.
 * @warning 🚨 it doesn't work exactly like the native slice as it will ignore the end index if start index is negative
 */
type Slice<
  T extends string,
  startIndex extends number = 0,
  endIndex extends number = Split<T>['length'],
> = T extends `${infer head}${infer rest}`
  ? startIndex extends 0
    ? endIndex extends 0
      ? ''
      : `${head}${Slice<
          rest,
          0,
          endIndex extends -1 ? -1 : Math.Subtract<endIndex, 1>
        >}`
    : `${Slice<
        rest,
        Math.Subtract<Math.GetPositiveIndex<T, startIndex>, 1>,
        Math.IsPositive<startIndex> extends true
          ? Math.Subtract<endIndex, 1>
          : Split<T>['length'] // TODO: figure out how to deal with negative endIndex
      >}`
  : ''
/**
 * A strongly-typed version of `String.prototype.slice`.
 * @param str the string to slice.
 * @param start the start index.
 * @param end the end index.
 * @returns the sliced string in both type level and runtime.
 * @example slice('hello world', 6) // 'world'
 * @warning 🚨 it doesn't work exactly like the native slice as it will ignore the end index if start index is negative
 */
function slice<
  T extends string,
  const S extends number = 0,
  const E extends number = Split<T>['length'],
>(str: T, start: S = 0 as S, end: E = str.length as E) {
  // TODO: figure out how to deal with negative endIndex
  return str.slice(start, start < 0 ? undefined : end) as Slice<T, S, E>
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
function split<T extends string, D extends string = ''>(str: T, delimiter?: D) {
  return str.split(delimiter ?? ('' as const)) as Split<T, D>
}

type StartsWith<
  T extends string,
  S extends string,
  P extends number = 0,
> = Math.IsPositive<P> extends true
  ? P extends 0
    ? T extends `${infer TFirst}${infer TRest}`
      ? S extends `${infer SFirst}${infer SRest}`
        ? TFirst extends SFirst
          ? StartsWith<TRest, SRest, P> // Compare next character
          : false // T differs from S
        : true // S (Search) is exhausted (and didn't fail)
      : false // T (Text) is exhausted with S (Search) leftover
    : StartsWith<Slice<T, P>, S, 0> // P is >0, slice
  : StartsWith<T, S, 0> // P (Position) is negative, ignore

function startsWith<T extends string, S extends string, P extends number = 0>(
  text: T,
  search: S,
  position = 0 as P,
) {
  return text.startsWith(search, position) as StartsWith<T, S, P>
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
  Join,
  Length,
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
  join,
  length,
  replace,
  replaceAll,
  slice,
  split,
  startsWith,
  trim,
  trimStart,
  trimEnd,
}
