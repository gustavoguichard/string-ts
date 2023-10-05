import type { Length } from './primitives'
import { TupleOf } from './utils'

namespace Math {
  export type Subtract<
    A extends number,
    B extends number,
  > = TupleOf<A> extends [...infer U, ...TupleOf<B>] ? U['length'] : 0

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
