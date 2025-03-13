import {
  SEPARATORS_TEXT,
  type WeirdTextUnion,
} from '../../internal/fixtures.js'
import { type ConstantCase, constantCase } from './constant-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      ConstantCase<WeirdTextUnion>,
      | 'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WUMBO'
      | 'WHERES_THE_LEAK_MAAM'
      | 'DONT_DISTRIBUTE_UNIONS'
    >
  >
}

describe('constantCase', () => {
  test('casing functions', () => {
    const expected =
      'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WUMBO' as const
    const result = constantCase(
      ' someWeird-cased$*String1986Foo Bar W_FOR_WUMBO'
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('with various separators', () => {
    const result = constantCase(SEPARATORS_TEXT)
    const expected = 'ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE_TEN'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
