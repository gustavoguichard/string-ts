import type { Reject, DropSuffix } from '../internal/internals.js'
import type { IsSeparator } from './characters/separators.js'
import { SEPARATOR_REGEX } from './characters/separators.js'
import type { IsLower, IsUpper } from './characters/letters.js'
import type { IsDigit } from './characters/numbers.js'
import type { IsSpecial } from './characters/special.js'
import type { IsStringLiteral } from '../internal/literals.js'

/**
 * Splits a string into words.
 * sentence: The current string to split.
 * word: The current word.
 * prev: The previous character.
 */
export type Words<
  sentence extends string,
  word extends string = '',
  prev extends string = '',
> = IsStringLiteral<sentence | word | prev> extends true
  ? sentence extends `${infer curr}${infer rest}`
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
  : string[] // Avoid spending resources on a wide type

/**
 * A strongly typed function to extract the words from a sentence.
 * @param sentence the sentence to extract the words from.
 * @returns an array of words in both type level and runtime.
 * @example words('helloWorld') // ['hello', 'World']
 */
export function words<T extends string>(sentence: T): Words<T> {
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
