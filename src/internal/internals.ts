import { capitalize } from '../utils/word-case/capitalize.js'
import { toLowerCase } from '../native/to-lower-case.js'

/**
 * This is an enhanced version of the typeof operator to check the type of more complex values.
 * In this case we just mind about arrays and objects. We can add more on demand.
 * @param t the value to be checked
 * @returns the type of the value
 */
function typeOf(t: unknown) {
  return Object.prototype.toString
    .call(t)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase() as 'array' | 'object' | (string & {})
}

// MAP TYPES
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
 * Removes all the elements matching the given condition from a tuple.
 */
type Reject<tuple, cond, output extends any[] = []> = tuple extends [
  infer first,
  ...infer rest,
]
  ? Reject<rest, cond, first extends cond ? output : [...output, first]>
  : output

/**
 * Removes the given suffix from a sentence.
 */
type DropSuffix<
  sentence extends string,
  suffix extends string,
> = sentence extends `${infer rest}${suffix}` ? rest : sentence

/**
 * Returns a tuple of the given length with the given type.
 */
type TupleOf<
  L extends number,
  T = unknown,
  result extends any[] = [],
> = result['length'] extends L ? result : TupleOf<L, T, [...result, T]>

export type { Reject, DropSuffix, PascalCaseAll, TupleOf }
export { pascalCaseAll, typeOf }
