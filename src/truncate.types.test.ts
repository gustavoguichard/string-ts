import type * as Subject from './truncate'

namespace TruncateTests {
  type test1 = Expect<Equal<Subject.Truncate<'Hello, world', 9>, 'Hello,...'>>
  type test2 = Expect<
    Equal<Subject.Truncate<'Hello, world', 12>, 'Hello, world'>
  >
  type test3 = Expect<Equal<Subject.Truncate<'Hello, world', 2>, '...'>>
  type test4 = Expect<
    Equal<Subject.Truncate<'Hello, world', 9, '[...]'>, 'Hell[...]'>
  >
  type test5 = Expect<Equal<Subject.Truncate<'Hello, world', -1>, '...'>>
  type test6 = Expect<
    Equal<Subject.Truncate<'Hello, world', 0, '[...]'>, '[...]'>
  >
}

test('dummy test', () => expect(true).toBe(true))
