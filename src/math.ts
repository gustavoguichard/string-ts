import type { Length } from './primitives'

type GetTuple<
  L extends number,
  result extends any[] = [],
> = result['length'] extends L ? result : GetTuple<L, [...result, any]>

namespace Math {
  export type Subtract<
    A extends number,
    B extends number,
  > = GetTuple<A> extends [...infer U, ...GetTuple<B>] ? U['length'] : 0

  export type IsPositive<T extends number> = `${T}` extends `-${number}`
    ? false
    : true

  export type Abs<T extends number> =
    `${T}` extends `-${infer U extends number}` ? U : T

  export type GetPositiveIndex<
    T extends string,
    I extends number,
  > = IsPositive<I> extends true ? I : Subtract<Length<T>, Abs<I>>
}

export type { Math }
