import type { Math } from '../internal/math.js'
import type { Length } from './length.js'
import type {
  All,
  IsStringLiteral,
  IsNumberLiteral,
} from '../internal/literals.js'

/**
 * Slices a string from a startIndex to an endIndex.
 * T: The string to slice.
 * startIndex: The start index.
 * endIndex: The end index.
 */
export type Slice<
  T extends string,
  startIndex extends number = 0,
  endIndex extends number = Length<T>,
> = All<
  [IsStringLiteral<T>, IsNumberLiteral<startIndex | endIndex>]
> extends true
  ? T extends `${infer head}${infer rest}`
    ? startIndex extends 0
      ? endIndex extends 0
        ? ''
        : `${head}${Slice<
            rest,
            Math.Subtract<Math.GetPositiveIndex<T, startIndex>, 1>,
            Math.Subtract<Math.GetPositiveIndex<T, endIndex>, 1>
          >}`
      : `${Slice<
          rest,
          Math.Subtract<Math.GetPositiveIndex<T, startIndex>, 1>,
          Math.Subtract<Math.GetPositiveIndex<T, endIndex>, 1>
        >}`
    : ''
  : string
/**
 * A strongly-typed version of `String.prototype.slice`.
 * @param str the string to slice.
 * @param start the start index.
 * @param end the end index.
 * @returns the sliced string in both type level and runtime.
 * @example slice('hello world', 6) // 'world'
 */
export function slice<
  T extends string,
  S extends number = 0,
  E extends number = Length<T>,
>(str: T, start: S = 0 as S, end: E = str.length as E) {
  return str.slice(start, end) as Slice<T, S, E>
}
