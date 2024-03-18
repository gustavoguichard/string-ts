/**
 * Reverses a string.
 * - `T` The string to reverse.
 */
type Reverse<
  T extends string,
  _acc extends string = '',
> = T extends `${infer Head}${infer Tail}`
  ? Reverse<Tail, `${Head}${_acc}`>
  : _acc extends ''
    ? T
    : `${T}${_acc}`

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
