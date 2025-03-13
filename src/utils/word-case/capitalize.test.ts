import { WEIRD_TEXT } from '../../internal/fixtures.js'
import { capitalize } from './capitalize.js'

describe('capitalize', () => {
  test('it does nothing with a string that has no char at the beginning', () => {
    const expected = WEIRD_TEXT
    const result = capitalize(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('it capitalizes the first char of a string', () => {
    const expected = 'SomeWeird-casedString' as const
    const result = capitalize('someWeird-casedString')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
