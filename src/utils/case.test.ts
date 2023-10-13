import type { Uncap, Lower, Upper, Cap } from './case.js'

namespace Internals {
  type Uncap1 = Expect<Equal<Uncap<'ABC'>, 'aBC'>>
  type Uncap2 = Expect<Equal<Uncap<string>, string>>

  type Lower1 = Expect<Equal<Lower<'ABC'>, 'abc'>>
  type Lower2 = Expect<Equal<Lower<string>, string>>

  type Upper1 = Expect<Equal<Upper<'abc'>, 'ABC'>>
  type Upper2 = Expect<Equal<Upper<string>, string>>

  type Cap1 = Expect<Equal<Cap<'abc'>, 'Abc'>>
  type Cap2 = Expect<Equal<Cap<string>, string>>
}

test('dummy test', () => expect(true).toBe(true))
