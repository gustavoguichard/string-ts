import type { Words } from '../src/words.js'
import type { Truncate } from '../src/truncate.js'

namespace WordsTests {
  type test1 = Expect<
    Equal<
      Words<' someWeird-cased$*String1986Foo Bar obj.items[0]'>,
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

namespace TruncateTests {
  type test1 = Expect<Equal<Truncate<'Hello, world', 9>, 'Hello,...'>>
  type test2 = Expect<Equal<Truncate<'Hello, world', 12>, 'Hello, world'>>
  type test3 = Expect<Equal<Truncate<'Hello, world', 2>, '...'>>
  type test4 = Expect<Equal<Truncate<'Hello, world', 9, '[...]'>, 'Hell[...]'>>
  type test5 = Expect<Equal<Truncate<'Hello, world', -1>, '...'>>
  type test6 = Expect<Equal<Truncate<'Hello, world', 0, '[...]'>, '[...]'>>
}

test('dummy test', () => expect(true).toBe(true))
