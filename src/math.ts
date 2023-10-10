import type { Length } from './length.js'
import type { TupleOf } from './internals.js'

namespace Math {
  export type Subtract<
    A extends number,
    B extends number,
  > = TupleOf<A> extends [...infer U, ...TupleOf<B>] ? U['length'] : 0

  export type IsNegative<T extends number> = `${T}` extends `-${number}`
    ? true
    : false

  export type Abs<T extends number> =
    `${T}` extends `-${infer U extends number}` ? U : T

  export type GetPositiveIndex<
    T extends string,
    I extends number,
  > = IsNegative<I> extends false ? I : Subtract<Length<T>, Abs<I>>
}

export type { Math }
