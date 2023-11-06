import type * as Subject from './special.js'

namespace TypeChecks {
  type test1 = Expect<Equal<Subject.IsSpecial<'1'>, false>>
  type test2 = Expect<Equal<Subject.IsSpecial<'a'>, false>>
  type test3 = Expect<Equal<Subject.IsSpecial<'A'>, false>>
  type test4 = Expect<Equal<Subject.IsSpecial<'$'>, true>>
  type test5 = Expect<Equal<Subject.IsSpecial<' '>, false>>
  type test6 = Expect<Equal<Subject.IsSpecial<'*'>, true>>
  type test7 = Expect<Equal<Subject.IsSpecial<'_'>, false>>
  type test8 = Expect<Equal<Subject.IsSpecial<string>, boolean>>
  type test9 = Expect<Equal<Subject.IsSpecial<Uppercase<string>>, boolean>>
}
test('dummy test', () => expect(true).toBe(true))
