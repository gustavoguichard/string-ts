/**
 * Appends a suffix to a string.
 * - `T` The input string.
 * - `Suffix` The string to append.
 */
type Append<T extends string, Suffix extends string> = `${T}${Suffix}`

/**
 * A strongly-typed function to append a suffix to a string.
 * @param str the string to append to.
 * @param suffix the string to append.
 * @returns the appended string in both type level and runtime.
 * @example append('user', '_id') // 'user_id'
 */
function append<T extends string, Suffix extends string>(
  str: T,
  suffix: Suffix
) {
  return `${str}${suffix}` as Append<T, Suffix>
}

export type { Append }
export { append }
