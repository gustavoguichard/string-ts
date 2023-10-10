import type * as Subject from './utils'

namespace WordsTests {
  type test1 = Expect<
    Equal<
      Subject.Words<' someWeird-cased$*String1986Foo Bar obj.items[0]prev2PreV2'>,
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
        'prev',
        '2',
        'Pre',
        'V2',
      ]
    >
  >
}

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
