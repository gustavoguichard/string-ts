import type * as Subject from './join'

namespace TypeTests {
  type test1 = Expect<
    Equal<Subject.Join<['some', 'nice', 'string'], ' '>, 'some nice string'>
  >
}

test('dummy test', () => expect(true).toBe(true))
