import type { IsDigit } from './numbers.js'

namespace TypeChecks {
  type test1 = Expect<Equal<IsDigit<'1'>, true>>
  type test2 = Expect<Equal<IsDigit<'a'>, false>>
  type test3 = Expect<Equal<IsDigit<'A'>, false>>
  type test4 = Expect<Equal<IsDigit<'$'>, false>>
  type test5 = Expect<Equal<IsDigit<string>, boolean>>
}

test('dummy test', () => expect(true).toBe(true))
