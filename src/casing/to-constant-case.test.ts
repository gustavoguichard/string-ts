import { SEPARATORS_TEXT } from '../internal/fixtures.js'
import { toConstantCase } from './to-constant-case.js'

describe('toConstantCase', () => {
  test('casing functions', () => {
    const expected =
      'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WUMBO' as const
    const result = toConstantCase(
      ' someWeird-cased$*String1986Foo Bar W_FOR_WUMBO',
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('with various separators', () => {
    const result = toConstantCase(SEPARATORS_TEXT)
    const expected = 'ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE_TEN'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
