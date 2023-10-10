import { WEIRD_TEXT, SEPARATORS_TEXT } from '../../internal/fixtures.js'
import { upperCase } from './upper-case.js'

describe('upperCase', () => {
  test('casing functions', () => {
    const expected =
      'SOME WEIRD CASED $* STRING 1986 FOO BAR W FOR WUMBO' as const
    const result = upperCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('upperCase', () => {
    const result = upperCase(SEPARATORS_TEXT)
    const expected = 'ONE TWO THREE FOUR FIVE SIX SEVEN EIGHT NINE TEN'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
