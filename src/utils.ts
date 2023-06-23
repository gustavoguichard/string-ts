import { Drop, DropSuffix } from './internals'

// UTILITIES FOR DETECTING CHARS
type IsUpper<T extends string> = T extends Uppercase<T> ? true : false
type IsLetter<T extends string> = T extends Lowercase<T> | Uppercase<T>
  ? true
  : false
type IsLower<T extends string> = T extends Lowercase<T> ? true : false
type IsDigit<T extends string> = T extends Digit ? true : false
type IsSeparator<T extends string> = T extends Separator ? true : false

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
      [word, ...Words<rest>]
    : prev extends ''
    ? // Start of sentence, start a new word
      Drop<Words<rest, curr, curr>, ''>
    : [false, true] extends [IsDigit<prev>, IsDigit<curr>]
    ? // Step 2: From non-digit to digit
      [word, ...Words<rest, curr, curr>]
    : [true, false] extends [IsDigit<prev>, IsDigit<curr>]
    ? // Step 3: From digit to non-digit
      [word, ...Words<rest, curr, curr>]
    : [true, true] extends [IsDigit<prev>, IsDigit<curr>]
    ? // If both are digit, continue with the sentence
      Drop<Words<rest, `${word}${curr}`, curr>, ''>
    : [true, true] extends [IsLower<prev>, IsUpper<curr>]
    ? // Step 4: From lower to upper
      [word, ...Words<rest, curr, curr>]
    : [true, true] extends [IsUpper<prev>, IsLower<curr>]
    ? // Step 5: From upper to upper and lower
      // Remove the last character from the current word and start a new word with it
      [DropSuffix<word, prev>, ...Words<rest, `${prev}${curr}`, curr>]
    : Drop<Words<rest, `${word}${curr}`, curr>, ''> // Otherwise continue with the sentence
  : // Step 6: Trim the last word
    Drop<[word], ''>

/**
 * A strongly typed function to extract the words from a sentence.
 * @param sentence the sentence to extract the words from.
 * @returns an array of words in both type level and runtime.
 */
function words<T extends string>(sentence: T): Words<T> {
  // can be implemented with a single regex but it's not as readable
  // sentence.match(
  //   /([A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b))|([A-Z]?[a-z]+)|([A-Z])|([0-9]+)/g,
  // )
  return sentence
    .replace(/[_\-./]/g, ' ') // Step 1: Remove separators
    .replace(/([a-z])([0-9])/g, '$1 $2') // Step 2: From non-digit to digit
    .replace(/([0-9])([a-z])/g, '$1 $2') // Step 3: From digit to non-digit
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Step 4: From lower to upper
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Step 5: From upper to upper and lower
    .trim() // Step 6: Trim the last word
    .split(/\s+/g) as Words<T>
}

export type { Words, IsDigit, IsLetter, IsUpper, IsLower, IsSeparator }
export { words }
