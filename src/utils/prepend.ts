/**
 * Prepends a prefix to a string.
 * - `T` The input string.
 * - `Prefix` The string to prepend.
 */
type Prepend<T extends string, Prefix extends string> = `${Prefix}${T}`

/**
 * A strongly-typed function to prepend a prefix to a string.
 * @param str the string to prepend to.
 * @param prefix the string to prepend.
 * @returns the prepended string in both type level and runtime.
 * @example prepend('id', 'user_') // 'user_id'
 */
function prepend<T extends string, Prefix extends string>(
  str: T,
  prefix: Prefix
) {
  return `${prefix}${str}` as Prepend<T, Prefix>
}

export type { Prepend }
export { prepend }
