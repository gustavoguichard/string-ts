/**
 * This function is a strongly-typed counterpart of String.prototype.toUpperCase.
 * @param str the string to make uppercase.
 * @returns the uppercased string.
 * @example toUpperCase('hello world') // 'HELLO WORLD'
 */
export function toUpperCase<T extends string>(str: T) {
  return str.toUpperCase() as Uppercase<T>
}
