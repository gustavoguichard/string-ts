import { SEPARATORS_TEXT, WEIRD_TEXT } from '../internal/fixtures.js'
import { toLowerCase } from './to-lower-case.js'

describe('toLowerCase', () => {
  test('casing functions', () => {
    const expected =
      ' someweird-cased$*string1986foo [bar] w_for_wumbo...' as const
    const result = toLowerCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toLowerCase(SEPARATORS_TEXT)
    const expected = '[one] two-three/four.five(six){seven}|eight_nine\\ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
