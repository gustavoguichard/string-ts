import type { Uncap, Lower, Upper, Cap } from './case.js'

namespace Internals {
  type testUncap1 = Expect<Equal<Uncap<'ABC'>, 'aBC'>>
  type testUncap2 = Expect<Equal<Uncap<string>, string>>

  type testLower1 = Expect<Equal<Lower<'ABC'>, 'abc'>>
  type testLower2 = Expect<Equal<Lower<string>, string>>

  type testUpper1 = Expect<Equal<Upper<'abc'>, 'ABC'>>
  type testUpper2 = Expect<Equal<Upper<string>, string>>

  type testCap1 = Expect<Equal<Cap<'abc'>, 'Abc'>>
  type testCap2 = Expect<Equal<Cap<string>, string>>
}

test('dummy test', () => expect(true).toBe(true))
