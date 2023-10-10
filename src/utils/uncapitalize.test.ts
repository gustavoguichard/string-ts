import { uncapitalize } from './uncapitalize.js'
import { WEIRD_TEXT } from '../internal/fixtures.js'

describe('uncapitalize', () => {
  test('it does nothing with a string that has no char at the beginning', () => {
    const expected = WEIRD_TEXT
    const result = uncapitalize(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('it uncapitalizes the first char of a string', () => {
    const expected = 'someWeird-casedString' as const
    const result = uncapitalize('SomeWeird-casedString')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
