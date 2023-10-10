import { WEIRD_TEXT, SEPARATORS_TEXT } from '../internal/fixtures.js'
import { toTitleCase } from './to-title-case.js'

describe('toTitleCase', () => {
  test('casing functions', () => {
    const expected =
      'Some Weird Cased $* String 1986 Foo Bar W For Wumbo' as const
    const result = toTitleCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toTitleCase(SEPARATORS_TEXT)
    const expected = 'One Two Three Four Five Six Seven Eight Nine Ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
