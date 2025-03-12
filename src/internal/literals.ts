/**
 * Returns true if input number type is a literal
 */
type IsNumberLiteral<T extends number> = [T] extends [number]
  ? [number] extends [T]
    ? false
    : true
  : false

type IsBooleanLiteral<T extends boolean> = [T] extends [boolean]
  ? [boolean] extends [T]
    ? false
    : true
  : false

/**
 * Returns true if any elements in boolean array are the literal true (not false or boolean)
 */
type Any<Arr extends boolean[]> = Arr extends [
  infer Head extends boolean,
  ...infer Rest extends boolean[],
]
  ? IsBooleanLiteral<Head> extends true
    ? Head extends true
      ? true
      : Any<Rest>
    : Any<Rest>
  : false

/**
 * Returns true if every element in boolean array is the literal true (not false or boolean)
 */
type All<Arr extends boolean[]> = IsBooleanLiteral<Arr[number]> extends true
  ? Arr extends [infer Head extends boolean, ...infer Rest extends boolean[]]
    ? Head extends true
      ? Any<Rest>
      : false // Found `false` in array
    : true // Empty array (or all elements have already passed test)
  : false // Array/Tuple contains `boolean` type

/**
 * Returns true if string input type is a literal
 */
type IsStringLiteral<T extends string> = [T] extends [string]
  ? [string] extends [T]
    ? false
    : Uppercase<T> extends Uppercase<Lowercase<T>>
      ? Lowercase<T> extends Lowercase<Uppercase<T>>
        ? true
        : false
      : false
  : false

type IsStringLiteralArray<Arr extends string[] | readonly string[]> =
  IsStringLiteral<Arr[number]> extends true ? true : false

export type {
  IsNumberLiteral,
  IsBooleanLiteral,
  Any,
  All,
  IsStringLiteral,
  IsStringLiteralArray,
}
