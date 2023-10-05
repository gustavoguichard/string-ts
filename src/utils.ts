import type { Math } from './math'
import type { Slice, Split } from './primitives'
import type { Drop, DropSuffix } from './internals'

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Separator = ' ' | '_' | '-' | '.' | '/'

// GENERAL UTILITIES

/**
 * Assures the generic matches the given condition.
 */
type Is<T, cond> = Extract<T, cond>

// prettier-ignore
type UpperChars = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type LowerChars = Lowercase<UpperChars>

// UTILITIES FOR DETECTING CHARS
/**
 * Checks if the given character is an upper case letter.
 */
type IsUpper<T extends string> = T extends UpperChars ? true : false

/**
 * Checks if the given character is a letter.
 */
type IsLetter<T extends string> = IsUpper<T> extends true
  ? true
  : IsLower<T> extends true
  ? true
  : false

/**
 * Checks if the given character is a lower case letter.
 */
type IsLower<T extends string> = T extends LowerChars ? true : false

/**
 * Checks if the given character is a number.
 */
type IsDigit<T extends string> = T extends Digit ? true : false

/**
 * Checks if the given character is a separator.
 * E.g. space, underscore, dash, dot, slash.
 */
type IsSeparator<T extends string> = T extends Separator ? true : false

/**
 * Checks if the given character is a special character.
 * E.g. not a letter, number, or separator.
 */
type IsSpecial<T extends string> = IsLetter<T> extends true
  ? false
  : IsDigit<T> extends true
  ? false
  : IsSeparator<T> extends true
  ? false
  : true

/**
 * Returns a tuple of the given length with the given type.
 */
type TupleOf<
  L extends number,
  T = unknown,
  result extends any[] = [],
> = result['length'] extends L ? result : TupleOf<L, T, [...result, T]>

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
      Drop<[word, ...Words<rest>], ''>
    : prev extends ''
    ? // Start of sentence, start a new word
      Drop<Words<rest, curr, curr>, ''>
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
      Drop<Words<rest, `${word}${curr}`, curr>, ''>
    : [true, true] extends [IsLower<prev>, IsUpper<curr>]
    ? // Step 6: From lower to upper
      [word, ...Words<rest, curr, curr>]
    : [true, true] extends [IsUpper<prev>, IsLower<curr>]
    ? // Step 7: From upper to upper and lower
      // Remove the last character from the current word and start a new word with it
      [DropSuffix<word, prev>, ...Words<rest, `${prev}${curr}`, curr>]
    : Drop<Words<rest, `${word}${curr}`, curr>, ''> // Otherwise continue with the sentence
  : // Step 8: Trim the last word
    Drop<[word], ''>

/**
 * A strongly typed function to extract the words from a sentence.
 * @param sentence the sentence to extract the words from.
 * @returns an array of words in both type level and runtime.
 * @example words('helloWorld') // ['hello', 'World']
 */
function words<T extends string>(sentence: T): Words<T> {
  // can be implemented with a single regex but it's not as readable
  // sentence.match(
  //   /([A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b))|([A-Z]?[a-z]+)|([A-Z])|([0-9]+)/g,
  // )
  return sentence
    .replace(/[_\-./]/g, ' ') // Step 1: Remove separators
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
  : Math.Subtract<Split<T>['length'], Size> extends 0
  ? T
  : `${Slice<T, 0, Math.Subtract<Size, Split<Omission>['length']>>}${Omission}`

/**
 * A strongly typed function to truncate a string .
 * if it's longer than the given maximum string length.
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
  if (length <= 0) return omission as Truncate<T, S, P>
  if (sentence.length <= length) return sentence as Truncate<T, S, P>
  if (sentence.length <= omission.length) return omission as Truncate<T, S, P>
  return `${sentence.slice(
    0,
    length - omission.length,
  )}${omission}` as Truncate<T, S, P>
}

export type {
  Digit,
  Is,
  IsDigit,
  IsLetter,
  IsLower,
  IsSeparator,
  IsSpecial,
  IsUpper,
  Separator,
  TupleOf,
  Truncate,
  Words,
}
export { truncate, words }
