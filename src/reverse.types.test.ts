import type * as Subject from './reverse'

namespace ReverseTests {
  type test1 = Expect<
    Equal<
      Subject.Reverse<'hello'>,
      'olleh'
    >
  >
  type test2 = Expect<
    Equal<
      Subject.Reverse<'123'>,
      '321'
    >
  >
  type test3 = Expect<
    Equal<
      Subject.Reverse<'I love TypeScript!'>,
      '!tpircSepyT evol I'
    >
  >
}

test('dummy test', () => expect(true).toBe(true))
