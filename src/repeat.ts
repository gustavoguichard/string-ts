import type { Math } from './math.js'
import type { Join } from './join.js'
import type { TupleOf } from './internals.js'

/**
 * Repeats a string N times.
 * T: The string to repeat.
 * N: The number of times to repeat.
 */
export type Repeat<T extends string, times extends number = 0> = times extends 0
  ? ''
  : Math.IsNegative<times> extends false
  ? Join<TupleOf<times, T>>
  : never
/**
 * A strongly-typed version of `String.prototype.repeat`.
 * @param str the string to repeat.
 * @param times the number of times to repeat.
 * @returns the repeated string in both type level and runtime.
 * @example repeat('hello', 3) // 'hellohellohello'
 */
export function repeat<T extends string, N extends number = 0>(
  str: T,
  times: N = 0 as N,
) {
  return str.repeat(times) as Repeat<T, N>
}
