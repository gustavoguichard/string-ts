import type {
  UncapitalizeSTS,
  LowercaseSTS,
  UppercaseSTS,
} from './intrinsic.js'

namespace Internals {
  type UncapitalizeSTS1 = Expect<Equal<UncapitalizeSTS<'ABC'>, 'aBC'>>
  type UncapitalizeSTS2 = Expect<Equal<UncapitalizeSTS<string>, string>>

  type LowercaseSTS1 = Expect<Equal<LowercaseSTS<'ABC'>, 'abc'>>
  type LowercaseSTS2 = Expect<Equal<LowercaseSTS<string>, string>>

  type UppercaseSTS1 = Expect<Equal<UppercaseSTS<'abc'>, 'ABC'>>
  type UppercaseSTS2 = Expect<Equal<UppercaseSTS<string>, string>>
}
