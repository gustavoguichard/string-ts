import { WEIRD_TEXT, SEPARATORS_TEXT } from '../src/fixtures.js'
import { toUpperCase } from '../src/toUpperCase.js'

describe('toUpperCase', () => {
  test('casing functions', () => {
    const expected =
      ' SOMEWEIRD-CASED$*STRING1986FOO [BAR] W_FOR_WUMBO...' as const
    const result = toUpperCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toUpperCase(SEPARATORS_TEXT)
    const expected = '[ONE] TWO-THREE/FOUR.FIVE(SIX){SEVEN}|EIGHT_NINE\\TEN'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
