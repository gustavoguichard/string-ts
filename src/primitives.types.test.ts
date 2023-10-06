import type * as Subject from './primitives'

namespace TypeTests {
  type test1 = Expect<
    Equal<Subject.Join<['some', 'nice', 'string'], ' '>, 'some nice string'>
  >
  type test4 = Expect<
    Equal<Subject.TrimStart<' some nice string '>, 'some nice string '>
  >
  type test5 = Expect<
    Equal<Subject.TrimEnd<' some nice string '>, ' some nice string'>
  >
  type test6 = Expect<
    Equal<Subject.Trim<' some nice string '>, 'some nice string'>
  >
  type test7 = Expect<
    Equal<Subject.Split<'some nice string', ' '>, ['some', 'nice', 'string']>
  >
  type test8 = Expect<Equal<Subject.CharAt<'some nice string', 5>, 'n'>>
  type test9 = Expect<
    Equal<Subject.Slice<'some nice string', 5>, 'nice string'>
  >
  type test10 = Expect<Equal<Subject.Length<'some nice string'>, 16>>

  type test11 = Expect<
    Equal<
      Subject.Concat<['a', 'bc', 'def'] | ['1', '23', '456']>,
      'abcdef' | '123456'
    >
  >

  type test12 = Expect<Equal<Subject.StartsWith<'abc', 'a'>, true>>
  type test13 = Expect<Equal<Subject.EndsWith<'abc', 'c'>, true>>
  type test14 = Expect<Equal<Subject.Includes<'abcde', 'bcd'>, true>>
}

test('dummy test', () => expect(true).toBe(true))
