import type * as Subject from '../separators'

namespace TypeChecks {
  type test1 = Expect<Equal<Subject.IsSeparator<'1'>, false>>
  type test2 = Expect<Equal<Subject.IsSeparator<'a'>, false>>
  type test3 = Expect<Equal<Subject.IsSeparator<'A'>, false>>
  type test4 = Expect<Equal<Subject.IsSeparator<'$'>, false>>
  type test5 = Expect<Equal<Subject.IsSeparator<' '>, true>>
  type test6 = Expect<Equal<Subject.IsSeparator<'-'>, true>>
  type test7 = Expect<Equal<Subject.IsSeparator<'/'>, true>>
  type test8 = Expect<Equal<Subject.IsSeparator<'_'>, true>>
  type test9 = Expect<Equal<Subject.IsSeparator<'.'>, true>>
}

test('dummy test', () => expect(true).toBe(true))
