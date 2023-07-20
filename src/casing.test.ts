import type * as Subject from './casing'
import * as subject from './casing'

const weirdString = ' someWeird-cased$*String1986Foo Bar W_FOR_WAMBO' as const
type WeirdString = typeof weirdString

namespace TypeTransforms {
  type test = Expect<
    Equal<
      Subject.DelimiterCase<WeirdString, '%'>,
      'some%Weird%cased%$*%String%1986%Foo%Bar%W%FOR%WAMBO'
    >
  >
  type test1 = Expect<
    Equal<
      Subject.CamelCase<WeirdString>,
      'someWeirdCased$*String1986FooBarWForWambo'
    >
  >
  type test2 = Expect<
    Equal<
      Subject.PascalCase<WeirdString>,
      'SomeWeirdCased$*String1986FooBarWForWambo'
    >
  >
  type test3 = Expect<
    Equal<
      Subject.KebabCase<WeirdString>,
      'some-weird-cased-$*-string-1986-foo-bar-w-for-wambo'
    >
  >
  type test4 = Expect<
    Equal<
      Subject.SnakeCase<WeirdString>,
      'some_weird_cased_$*_string_1986_foo_bar_w_for_wambo'
    >
  >
  type test5 = Expect<
    Equal<
      Subject.ConstantCase<WeirdString>,
      'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WAMBO'
    >
  >
  type test6 = Expect<
    Equal<
      Subject.TitleCase<WeirdString>,
      'Some Weird Cased $* String 1986 Foo Bar W For Wambo'
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

describe('casing functions', () => {
  test('toUpperCase', () => {
    const expected = ' SOMEWEIRD-CASED$*STRING1986FOO BAR W_FOR_WAMBO' as const
    const result = subject.toUpperCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toLowerCase', () => {
    const expected = ' someweird-cased$*string1986foo bar w_for_wambo' as const
    const result = subject.toLowerCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toDelimiterCase', () => {
    const expected =
      'some@Weird@cased@$*@String@1986@Foo@Bar@W@FOR@WAMBO' as const
    const result = subject.toDelimiterCase(weirdString, '@')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toCamelCase', () => {
    const expected = 'someWeirdCased$*String1986FooBarWForWambo' as const
    const result = subject.toCamelCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toPascalCase', () => {
    const expected = 'SomeWeirdCased$*String1986FooBarWForWambo' as const
    const result = subject.toPascalCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toKebabCase', () => {
    const expected =
      'some-weird-cased-$*-string-1986-foo-bar-w-for-wambo' as const
    const result = subject.toKebabCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toSnakeCase', () => {
    const expected =
      'some_weird_cased_$*_string_1986_foo_bar_w_for_wambo' as const
    const result = subject.toSnakeCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toConstantCase', () => {
    const expected =
      'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WAMBO' as const
    const result = subject.toConstantCase(
      ' someWeird-cased$*String1986Foo Bar W_FOR_WAMBO',
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('toTitleCase', () => {
    const expected =
      'Some Weird Cased $* String 1986 Foo Bar W For Wambo' as const
    const result = subject.toTitleCase(weirdString)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
