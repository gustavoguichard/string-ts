import type { IsLetter, IsLower, IsUpper } from './letters.js'

namespace TypeChecks {
  type testIsLower1 = Expect<Equal<IsLower<'1'>, false>>
  type testIsLower2 = Expect<Equal<IsLower<'a'>, true>>
  type testIsLower3 = Expect<Equal<IsLower<'A'>, false>>
  type testIsLower4 = Expect<Equal<IsLower<'$'>, false>>
  type testIsLower5 = Expect<Equal<IsLower<string>, boolean>>

  type testIsUpper1 = Expect<Equal<IsUpper<'1'>, false>>
  type testIsUpper2 = Expect<Equal<IsUpper<'a'>, false>>
  type testIsUpper3 = Expect<Equal<IsUpper<'A'>, true>>
  type testIsUpper4 = Expect<Equal<IsUpper<'$'>, false>>
  type testIsUpper5 = Expect<Equal<IsUpper<string>, boolean>>

  type testIsLetter1 = Expect<Equal<IsLetter<'1'>, false>>
  type testIsLetter2 = Expect<Equal<IsLetter<'a'>, true>>
  type testIsLetter3 = Expect<Equal<IsLetter<'A'>, true>>
  type testIsLetter4 = Expect<Equal<IsLetter<'$'>, false>>
  type testIsLetter5 = Expect<Equal<IsLetter<string>, boolean>>
}

test('dummy test', () => expect(true).toBe(true))
