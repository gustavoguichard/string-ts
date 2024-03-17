import type { Math } from '../internal/math.js'
import type { IsStringLiteral, IsNumberLiteral } from '../internal/literals.js'

/**
 * Slices a string from a startIndex to an endIndex.
 * T: The string to slice.
 * startIndex: The start index.
 * endIndex: The end index.
 */
export type Slice<
  T extends string,
  startIndex extends number = 0,
  endIndex extends number | undefined = undefined,
> = endIndex extends number
  ? _Slice<T, startIndex, endIndex>
  : _SliceStart<T, startIndex>

/** Slice with startIndex and endIndex */
type _Slice<
  T extends string,
  startIndex extends number,
  endIndex extends number,
  _result extends string = '',
> = IsNumberLiteral<startIndex | endIndex> extends true
  ? T extends `${infer head}${infer rest}`
    ? IsStringLiteral<head> extends true
      ? startIndex extends 0
        ? endIndex extends 0
          ? _result
          : _Slice<
              rest,
              0,
              Math.Subtract<Math.GetPositiveIndex<T, endIndex>, 1>,
              `${_result}${head}`
            >
        : _Slice<
            rest,
            Math.Subtract<Math.GetPositiveIndex<T, startIndex>, 1>,
            Math.Subtract<Math.GetPositiveIndex<T, endIndex>, 1>,
            _result
          >
      : string // Head is non-literal
    : IsStringLiteral<T> extends true // Couldn't be split into head/tail
      ? _result // T ran out
      : startIndex extends 0
        ? endIndex extends 0
          ? _result // Eg: Slice<`abc${string}`, 1, 3> -> 'bc'
          : string // Head is non-literal
        : string // Head is non-literal
  : string

/** Slice with startIndex only */
type _SliceStart<
  T extends string,
  startIndex extends number,
  _result extends string = '',
> = IsNumberLiteral<startIndex> extends true
  ? T extends `${infer head}${infer rest}`
    ? IsStringLiteral<head> extends true
      ? startIndex extends 0
        ? T
        : _SliceStart<
            rest,
            Math.Subtract<Math.GetPositiveIndex<T, startIndex>, 1>,
            _result
          >
      : string
    : IsStringLiteral<T> extends true
      ? _result
      : startIndex extends 0
        ? _result
        : string
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
  E extends number | undefined = undefined,
>(str: T, start: S = 0 as S, end: E = undefined as E) {
  return str.slice(start, end) as Slice<T, S, E>
}
