import type * as Subject from './utils'
import * as subject from './utils'

namespace TypeChecks {
  type test1 = Expect<Equal<Subject.IsDigit<'1'>, true>>
  type test2 = Expect<Equal<Subject.IsDigit<'a'>, false>>
  type test3 = Expect<Equal<Subject.IsDigit<'A'>, false>>
  type test4 = Expect<Equal<Subject.IsDigit<'$'>, false>>

  type test5 = Expect<Equal<Subject.IsLower<'1'>, false>>
  type test6 = Expect<Equal<Subject.IsLower<'a'>, true>>
  type test7 = Expect<Equal<Subject.IsLower<'A'>, false>>
  type test8 = Expect<Equal<Subject.IsLower<'$'>, false>>

  type test9 = Expect<Equal<Subject.IsUpper<'1'>, false>>
  type test10 = Expect<Equal<Subject.IsUpper<'a'>, false>>
  type test11 = Expect<Equal<Subject.IsUpper<'A'>, true>>
  type test12 = Expect<Equal<Subject.IsUpper<'$'>, false>>

  type test13 = Expect<Equal<Subject.IsLetter<'1'>, false>>
  type test14 = Expect<Equal<Subject.IsLetter<'a'>, true>>
  type test15 = Expect<Equal<Subject.IsLetter<'A'>, true>>
  type test16 = Expect<Equal<Subject.IsLetter<'$'>, false>>

  type test17 = Expect<Equal<Subject.IsSeparator<'1'>, false>>
  type test18 = Expect<Equal<Subject.IsSeparator<'a'>, false>>
  type test19 = Expect<Equal<Subject.IsSeparator<'A'>, false>>
  type test20 = Expect<Equal<Subject.IsSeparator<'$'>, false>>
  type test21 = Expect<Equal<Subject.IsSeparator<' '>, true>>
  type test22 = Expect<Equal<Subject.IsSeparator<'-'>, true>>
  type test23 = Expect<Equal<Subject.IsSeparator<'/'>, true>>
  type test24 = Expect<Equal<Subject.IsSeparator<'_'>, true>>
  type test25 = Expect<Equal<Subject.IsSeparator<'.'>, true>>

  type test26 = Expect<Equal<Subject.IsSpecial<'1'>, false>>
  type test27 = Expect<Equal<Subject.IsSpecial<'a'>, false>>
  type test28 = Expect<Equal<Subject.IsSpecial<'A'>, false>>
  type test29 = Expect<Equal<Subject.IsSpecial<'$'>, true>>
  type test30 = Expect<Equal<Subject.IsSpecial<' '>, false>>
  type test31 = Expect<Equal<Subject.IsSpecial<'*'>, true>>
  type test32 = Expect<Equal<Subject.IsSpecial<'_'>, false>>
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key]
}

namespace WordsTests {
  type Foo = Subject.Words<' someWeird-cased$*String1986Foo Bar '>
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

describe('words', () => {
  test('it splits words at separators', () => {
    const expected = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
    ] as const
    const result = subject.words(
      '[one] two-three/four.five(six){seven}|eight_nine\\ten',
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it splits words at digits', () => {
    const expected = ['2', 'Weird', 'Cased', '1986', 'Foo'] as const
    const result = subject.words('2WeirdCased1986Foo')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it splits words at special chars', () => {
    const expected = ['$', '2', 'Weird', 'Cased', '@@', 'Foo'] as const
    const result = subject.words('$2WeirdCased@@Foo')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it splits words at casing', () => {
    const expected = ['some', 'Weird', 'Cased', 'STRING', 'Foo'] as const
    const result = subject.words('someWeirdCasedSTRINGFoo')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it combines all of the rules above and trims the word', () => {
    const expected = [
      'some',
      'Weird',
      'cased',
      '$*',
      'String',
      '1986',
      'Foo',
      'Bar',
    ] as const
    const result = subject.words(' someWeird-cased$*String1986Foo Bar ')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })
})

describe('truncate', () => {
  test('truncate small sentence does nothing', () => {
    const expected = 'Hello' as const
    const result = subject.truncate('Hello', 9)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate big sentence truncate', () => {
    const expected = 'Hello ...' as const
    const result = subject.truncate('Hello world', 9)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate with negative integer does truncate', () => {
    const expected = '...' as const
    const result = subject.truncate('Hello world', -1)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate big sentence with specified omission', () => {
    const expected = 'Hello[...]' as const
    const result = subject.truncate('Hello world', 10, '[...]')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate small sentence with specified omission', () => {
    const expected = 'Hello' as const
    const result = subject.truncate('Hello', 10, '[...]')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
