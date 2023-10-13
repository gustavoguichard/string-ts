import type { Uncap, Lower, Upper, Cap } from './case.js'

namespace Internals {
  type typeUncap1 = Expect<Equal<Uncap<'ABC'>, 'aBC'>>
  type typeUncap2 = Expect<Equal<Uncap<string>, string>>

  type typeLower1 = Expect<Equal<Lower<'ABC'>, 'abc'>>
  type typeLower2 = Expect<Equal<Lower<string>, string>>

  type typeUpper1 = Expect<Equal<Upper<'abc'>, 'ABC'>>
  type typeUpper2 = Expect<Equal<Upper<string>, string>>

  type typeCap1 = Expect<Equal<Cap<'abc'>, 'Abc'>>
  type typeCap2 = Expect<Equal<Cap<string>, string>>
}

test('dummy test', () => expect(true).toBe(true))
