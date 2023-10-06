import type * as Subject from './replace-all'

namespace TypeTests {
  type test3 = Expect<
    Equal<Subject.ReplaceAll<'some nice string', ' ', '-'>, 'some-nice-string'>
  >
}

test('dummy test', () => expect(true).toBe(true))
