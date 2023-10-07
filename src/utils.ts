import type { Math } from './math'
import { join, type Join, type Length, type Slice } from './primitives'
import type { Reject, DropSuffix } from './internals'
import type { IsSeparator } from './separators'
import { SEPARATOR_REGEX } from './separators'
import type { IsDigit, IsLower, IsSpecial, IsUpper } from './chars'

// STRING FUNCTIONS
/**
 * Splits a string into words.
 * sentence: The current string to split.
 * word: The current word.
 * prev: The previous character.
 */
type Words<
  sentence extends string,
  word extends string = '',
  prev extends string = '',
> = string extends sentence
  ? string[] // Avoid spending resources on a wide type
  : sentence extends `${infer curr}${infer rest}`
  ? IsSeparator<curr> extends true
    ? // Step 1: Remove separators
      Reject<[word, ...Words<rest>], ''>
    : prev extends ''
    ? // Start of sentence, start a new word
      Reject<Words<rest, curr, curr>, ''>
    : [false, true] extends [IsDigit<prev>, IsDigit<curr>]
    ? // Step 2: From non-digit to digit
      [word, ...Words<rest, curr, curr>]
    : [true, false] extends [IsDigit<prev>, IsDigit<curr>]
    ? // Step 3: From digit to non-digit
      [word, ...Words<rest, curr, curr>]
    : [false, true] extends [IsSpecial<prev>, IsSpecial<curr>]
    ? // Step 4: From non-special to special
      [word, ...Words<rest, curr, curr>]
    : [true, false] extends [IsSpecial<prev>, IsSpecial<curr>]
    ? // Step 5: From special to non-special
      [word, ...Words<rest, curr, curr>]
    : [true, true] extends [IsDigit<prev>, IsDigit<curr>]
    ? // If both are digit, continue with the sentence
      Reject<Words<rest, `${word}${curr}`, curr>, ''>
    : [true, true] extends [IsLower<prev>, IsUpper<curr>]
    ? // Step 6: From lower to upper
      [word, ...Words<rest, curr, curr>]
    : [true, true] extends [IsUpper<prev>, IsLower<curr>]
    ? // Step 7: From upper to upper and lower
      // Remove the last character from the current word and start a new word with it
      [DropSuffix<word, prev>, ...Words<rest, `${prev}${curr}`, curr>]
    : Reject<Words<rest, `${word}${curr}`, curr>, ''> // Otherwise continue with the sentence
  : // Step 8: Trim the last word
    Reject<[word], ''>

/**
 * A strongly typed function to extract the words from a sentence.
 * @param sentence the sentence to extract the words from.
 * @returns an array of words in both type level and runtime.
 * @example words('helloWorld') // ['hello', 'World']
 */
function words<T extends string>(sentence: T): Words<T> {
  return sentence
    .replace(SEPARATOR_REGEX, ' ') // Step 1: Remove separators
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2') // Step 2: From non-digit to digit
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2') // Step 3: From digit to non-digit
    .replace(/([a-zA-Z0-9_\-./])([^a-zA-Z0-9_\-./])/g, '$1 $2') // Step 4: From non-special to special
    .replace(/([^a-zA-Z0-9_\-./])([a-zA-Z0-9_\-./])/g, '$1 $2') // Step 5: From special to non-special
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Step 6: From lower to upper
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Step 7: From upper to upper and lower
    .trim() // Step 8: Trim the last word
    .split(/\s+/g) as Words<T>
}

/**
 * Truncate a string if it's longer than the given maximum length.
 * The last characters of the truncated string are replaced with the omission string which defaults to "...".
 */
type Truncate<
  T extends string,
  Size extends number,
  Omission extends string = '...',
> = Math.IsNegative<Size> extends true
  ? Omission
  : Math.Subtract<Length<T>, Size> extends 0
  ? T
  : Join<[Slice<T, 0, Math.Subtract<Size, Length<Omission>>>, Omission]>

/**
 * A strongly typed function to truncate a string if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission string which defaults to "...".
 * @param sentence the sentence to extract the words from.
 * @param length the maximum length of the string.
 * @param omission the string to append to the end of the truncated string.
 * @returns the truncated string
 * @example truncate('Hello, World', 8) // 'Hello...'
 */
function truncate<T extends string, S extends number, P extends string = '...'>(
  sentence: T,
  length: S,
  omission = '...' as P,
): Truncate<T, S, P> {
  if (length < 0) return omission as Truncate<T, S, P>
  if (sentence.length <= length) return sentence as Truncate<T, S, P>
  return join([sentence.slice(0, length - omission.length), omission])
}

export type { Truncate, Words }
export { truncate, words }
