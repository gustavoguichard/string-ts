/**
 * Reverses a string.
 * - `T` The string to reverse.
 */
type Reverse<Str extends string, _acc extends string = ''> = Str extends `${infer Head}${infer Tail}`
  ? Reverse<Tail, `${Head}${_acc}`>
  : _acc extends '' ? Str : _acc

/**
 * A strongly-typed function to reverse a string.
 * @param str the string to reverse.
 * @returns the reversed string in both type level and runtime.
 * @example reverse('hello world') // 'dlrow olleh'
 */
function reverse<T extends string>(str: T) {
  return str.split('').reverse().join('') as Reverse<T>
}

export type { Reverse }
export { reverse }
