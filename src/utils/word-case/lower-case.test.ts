import { SEPARATORS_TEXT, WEIRD_TEXT } from '../../internal/fixtures.js'
import { lowerCase } from './lower-case.js'

describe('lowerCase', () => {
  test('casing functions', () => {
    const expected =
      'some weird cased $* string 1986 foo bar w for wumbo' as const
    const result = lowerCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('lowerCase', () => {
    const result = lowerCase(SEPARATORS_TEXT)
    const expected = 'one two three four five six seven eight nine ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
