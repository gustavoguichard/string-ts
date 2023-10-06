import type * as Subject from './words'

namespace WordsTests {
  type test1 = Expect<
    Equal<
      Subject.Words<' someWeird-cased$*String1986Foo Bar obj.items[0]'>,
      [
        'some',
        'Weird',
        'cased',
        '$*',
        'String',
        '1986',
        'Foo',
        'Bar',
        'obj',
        'items',
        '0',
      ]
    >
  >
}

test('dummy test', () => expect(true).toBe(true))
