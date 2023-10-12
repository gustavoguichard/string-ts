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
      '[one] two-three/four.five(six){seven}|eight_nine\\ten',
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
})
