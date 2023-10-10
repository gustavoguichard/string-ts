import type { IsLower, IsUpper, IsLetter } from './letters.js'

namespace TypeChecks {
  type test1 = Expect<Equal<IsLower<'1'>, false>>
  type test2 = Expect<Equal<IsLower<'a'>, true>>
  type test3 = Expect<Equal<IsLower<'A'>, false>>
  type test4 = Expect<Equal<IsLower<'$'>, false>>

  type test5 = Expect<Equal<IsUpper<'1'>, false>>
  type test6 = Expect<Equal<IsUpper<'a'>, false>>
  type test7 = Expect<Equal<IsUpper<'A'>, true>>
  type test8 = Expect<Equal<IsUpper<'$'>, false>>

  type test9 = Expect<Equal<IsLetter<'1'>, false>>
  type test10 = Expect<Equal<IsLetter<'a'>, true>>
  type test11 = Expect<Equal<IsLetter<'A'>, true>>
  type test12 = Expect<Equal<IsLetter<'$'>, false>>
}

test('dummy test', () => expect(true).toBe(true))
