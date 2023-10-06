import type * as Subject from './chars'

namespace TypeChecks {
  type test1 = Expect<Equal<Subject.IsDigit<'1'>, true>>
  type test2 = Expect<Equal<Subject.IsDigit<'a'>, false>>
  type test3 = Expect<Equal<Subject.IsDigit<'A'>, false>>
  type test4 = Expect<Equal<Subject.IsDigit<'$'>, false>>

  type test5 = Expect<Equal<Subject.IsLower<'1'>, false>>
  type test6 = Expect<Equal<Subject.IsLower<'a'>, true>>
  type test7 = Expect<Equal<Subject.IsLower<'A'>, false>>
  type test8 = Expect<Equal<Subject.IsLower<'$'>, false>>

  type test9 = Expect<Equal<Subject.IsUpper<'1'>, false>>
  type test10 = Expect<Equal<Subject.IsUpper<'a'>, false>>
  type test11 = Expect<Equal<Subject.IsUpper<'A'>, true>>
  type test12 = Expect<Equal<Subject.IsUpper<'$'>, false>>

  type test13 = Expect<Equal<Subject.IsLetter<'1'>, false>>
  type test14 = Expect<Equal<Subject.IsLetter<'a'>, true>>
  type test15 = Expect<Equal<Subject.IsLetter<'A'>, true>>
  type test16 = Expect<Equal<Subject.IsLetter<'$'>, false>>

  type test26 = Expect<Equal<Subject.IsSpecial<'1'>, false>>
  type test27 = Expect<Equal<Subject.IsSpecial<'a'>, false>>
  type test28 = Expect<Equal<Subject.IsSpecial<'A'>, false>>
  type test29 = Expect<Equal<Subject.IsSpecial<'$'>, true>>
  type test30 = Expect<Equal<Subject.IsSpecial<' '>, false>>
  type test31 = Expect<Equal<Subject.IsSpecial<'*'>, true>>
  type test32 = Expect<Equal<Subject.IsSpecial<'_'>, false>>
}
test('dummy test', () => expect(true).toBe(true))
