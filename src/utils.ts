import { Drop, DropSuffix } from './internals'

// prettier-ignore
type UpperChars = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type LowerChars = Lowercase<UpperChars>

// UTILITIES FOR DETECTING CHARS
type IsUpper<T extends string> = T extends UpperChars ? true : false
type IsLetter<T extends string> = IsUpper<T> extends true
  ? true
  : IsLower<T> extends true
  ? true
  : false
type IsLower<T extends string> = T extends LowerChars ? true : false
type IsDigit<T extends string> = T extends Digit ? true : false
type IsSeparator<T extends string> = T extends Separator ? true : false
type IsSpecial<T extends string> = IsLetter<T> extends true
  ? false
  : IsDigit<T> extends true
  ? false
  : IsSeparator<T> extends true
  ? false
  : true

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

export type {
  IsDigit,
  IsLetter,
  IsLower,
  IsSeparator,
  IsSpecial,
  IsUpper,
  Words,
}
export { words }
