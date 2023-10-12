import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../../internal/fixtures.js'
import { type DelimiterCase, delimiterCase } from './delimiter-case.js'

namespace TypeTransforms {
  type test1 = Expect<
    Equal<
      DelimiterCase<WeirdTextUnion, '%'>,
      | 'some%Weird%cased%$*%String%1986%Foo%Bar%W%FOR%WUMBO'
      | 'dont%distribute%unions'
    >
  >
  type test2 = Expect<Equal<DelimiterCase<string, '%'>, string>>
  type test3 = Expect<Equal<DelimiterCase<'abc', string>, string>>
}

describe('delimiterCase', () => {
  test('casing functions', () => {
    const expected =
      'some@Weird@cased@$*@String@1986@Foo@Bar@W@FOR@WUMBO' as const
    const result = delimiterCase(WEIRD_TEXT, '@')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = delimiterCase(SEPARATORS_TEXT, '.')
    const expected = 'one.two.three.four.five.six.seven.eight.nine.ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
