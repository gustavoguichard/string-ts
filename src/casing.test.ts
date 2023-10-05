import type * as Subject from './casing'
import * as subject from './casing'

const weirdString = ' someWeird-cased$*String1986Foo Bar W_FOR_WUMBO' as const
type WeirdString = typeof weirdString | 'dont.distribute unions'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      Subject.DelimiterCase<WeirdString, '%'>,
      | 'some%Weird%cased%$*%String%1986%Foo%Bar%W%FOR%WUMBO'
      | 'dont%distribute%unions'
    >
  >
  type test1 = Expect<
    Equal<
      Subject.CamelCase<WeirdString>,
      'someWeirdCased$*String1986FooBarWForWumbo' | 'dontDistributeUnions'
    >
  >
  type test2 = Expect<
    Equal<
      Subject.PascalCase<WeirdString>,
      'SomeWeirdCased$*String1986FooBarWForWumbo' | 'DontDistributeUnions'
    >
  >
  type test3 = Expect<
    Equal<
      Subject.KebabCase<WeirdString>,
      | 'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo'
      | 'dont-distribute-unions'
    >
  >
  type test4 = Expect<
    Equal<
      Subject.SnakeCase<WeirdString>,
      | 'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo'
      | 'dont_distribute_unions'
    >
  >
  type test5 = Expect<
    Equal<
      Subject.ConstantCase<WeirdString>,
      | 'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WUMBO'
      | 'DONT_DISTRIBUTE_UNIONS'
    >
  >
  type test6 = Expect<
    Equal<
      Subject.TitleCase<WeirdString>,
      | 'Some Weird Cased $* String 1986 Foo Bar W For Wumbo'
      | 'Dont Distribute Unions'
    >
  >
}

describe('capitalize', () => {
  test('it does nothing with a string that has no char at the beginning', () => {
    const expected = weirdString
    const result = subject.capitalize(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('it capitalizes the first char of a string', () => {
    const expected = 'SomeWeird-casedString' as const
    const result = subject.capitalize('someWeird-casedString')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('uncapitalize', () => {
  test('it does nothing with a string that has no char at the beginning', () => {
    const expected = weirdString
    const result = subject.uncapitalize(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('it uncapitalizes the first char of a string', () => {
    const expected = 'someWeird-casedString' as const
    const result = subject.uncapitalize('SomeWeird-casedString')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('casing functions', () => {
  test('toUpperCase', () => {
    const expected = ' SOMEWEIRD-CASED$*STRING1986FOO BAR W_FOR_WUMBO' as const
    const result = subject.toUpperCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toLowerCase', () => {
    const expected = ' someweird-cased$*string1986foo bar w_for_wumbo' as const
    const result = subject.toLowerCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toDelimiterCase', () => {
    const expected =
      'some@Weird@cased@$*@String@1986@Foo@Bar@W@FOR@WUMBO' as const
    const result = subject.toDelimiterCase(weirdString, '@')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toCamelCase', () => {
    const expected = 'someWeirdCased$*String1986FooBarWForWumbo' as const
    const result = subject.toCamelCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toPascalCase', () => {
    const expected = 'SomeWeirdCased$*String1986FooBarWForWumbo' as const
    const result = subject.toPascalCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toKebabCase', () => {
    const expected =
      'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo' as const
    const result = subject.toKebabCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toSnakeCase', () => {
    const expected =
      'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo' as const
    const result = subject.toSnakeCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toConstantCase', () => {
    const expected =
      'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WUMBO' as const
    const result = subject.toConstantCase(
      ' someWeird-cased$*String1986Foo Bar W_FOR_WUMBO',
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toTitleCase', () => {
    const expected =
      'Some Weird Cased $* String 1986 Foo Bar W For Wumbo' as const
    const result = subject.toTitleCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  describe('with various separators', () => {
    const text =
      '[one] two-three/four.five(six){seven}|eight_nine\\ten' as const

    test('toUpperCase', () => {
      const result = subject.toUpperCase(text)
      const expected = '[ONE] TWO-THREE/FOUR.FIVE(SIX){SEVEN}|EIGHT_NINE\\TEN'
      expect(result).toEqual(expected)
      type toUpperCaseTest = Expect<Equal<typeof result, typeof expected>>
    })

    test('toLowerCase', () => {
      const result = subject.toLowerCase(text)
      const expected = '[one] two-three/four.five(six){seven}|eight_nine\\ten'
      expect(result).toEqual(expected)
      type toLowerCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
    test('toDelimiterCase', () => {
      const result = subject.toDelimiterCase(text, '.')
      const expected = 'one.two.three.four.five.six.seven.eight.nine.ten'
      expect(result).toEqual(expected)
      type toDelimiterCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
    test('toCamelCase', () => {
      const result = subject.toCamelCase(text)
      const expected = 'oneTwoThreeFourFiveSixSevenEightNineTen'
      expect(result).toEqual(expected)
      type toCamelCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
    test('toPascalCase', () => {
      const result = subject.toPascalCase(text)
      const expected = 'OneTwoThreeFourFiveSixSevenEightNineTen'
      expect(result).toEqual(expected)
      type toPascalCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
    test('toKebabCase', () => {
      const result = subject.toKebabCase(text)
      const expected = 'one-two-three-four-five-six-seven-eight-nine-ten'
      expect(result).toEqual(expected)
      type toKebabCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
    test('toSnakeCase', () => {
      const result = subject.toSnakeCase(text)
      const expected = 'one_two_three_four_five_six_seven_eight_nine_ten'
      expect(result).toEqual(expected)
      type toSnakeCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
    test('toConstantCase', () => {
      const result = subject.toConstantCase(text)
      const expected = 'ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE_TEN'
      expect(result).toEqual(expected)
      type toConstantCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
    test('toTitleCase', () => {
      const result = subject.toTitleCase(text)
      const expected = 'One Two Three Four Five Six Seven Eight Nine Ten'
      expect(result).toEqual(expected)
      type toTitleCaseTest = Expect<Equal<typeof result, typeof expected>>
    })
  })
})
