import type { Words } from './words.js'
import { words } from './words.js'

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
  type test2 = Expect<Equal<Words<string>, string[]>>
  type test3 = Expect<Equal<Words<'abc def', string>, string[]>>
  type test4 = Expect<Equal<Words<'abc def', ' ', string>, string[]>>
  type test5 = Expect<
    Equal<Words<"Where's the leak ma'am">, ["Where's", 'the', 'leak', "ma'am"]>
  >
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key]
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
    const result = words(
      '[one] two-three/four.five(six){seven}|eight_nine\\ten'
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it splits words at digits', () => {
    const expected = ['2', 'Weird', 'Cased', '1986', 'Foo'] as const
    const result = words('2WeirdCased1986Foo')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it splits words at special chars', () => {
    const expected = ['$', '2', 'Weird', 'Cased', '@@', 'Foo'] as const
    const result = words('$2WeirdCased@@Foo')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it splits words at casing', () => {
    const expected = ['some', 'Weird', 'Cased', 'STRING', 'Foo'] as const
    const result = words('someWeirdCasedSTRINGFoo')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it preserves apostrophes', () => {
    const expected = ["Where's", 'the', 'leak', "ma'am"] as const
    const result = words("Where's the leak ma'am")
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
    const result = words(' someWeird-cased$*String1986Foo Bar ')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Mutable<typeof expected>>>
  })

  test('it treats tabs and newlines as separators', () => {
    const r1 = words('hello\tworld')
    expect(r1).toEqual(['hello', 'world'])
    type t1 = Expect<Equal<typeof r1, ['hello', 'world']>>

    const r2 = words('foo\nbar')
    expect(r2).toEqual(['foo', 'bar'])
    type t2 = Expect<Equal<typeof r2, ['foo', 'bar']>>
  })

  test('it returns an empty array for empty or separator-only strings', () => {
    const r1 = words('')
    expect(r1).toEqual([])
    type t1 = Expect<Equal<typeof r1, []>>

    const r2 = words('  ')
    expect(r2).toEqual([])
    type t2 = Expect<Equal<typeof r2, []>>

    const r3 = words('-_')
    expect(r3).toEqual([])
    type t3 = Expect<Equal<typeof r3, []>>
  })
})
