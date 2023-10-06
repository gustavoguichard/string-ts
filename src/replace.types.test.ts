import type * as Subject from './replace'

namespace TypeTests {
  type test2 = Expect<
    Equal<Subject.Replace<'some nice string', ' ', '-'>, 'some-nice string'>
  >
}

test('dummy test', () => expect(true).toBe(true))
