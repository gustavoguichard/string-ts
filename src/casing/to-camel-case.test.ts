import { WEIRD_TEXT, SEPARATORS_TEXT } from '../internal/fixtures.js'
import { toCamelCase } from './to-camel-case.js'

describe('toCamelCase', () => {
  test('casing functions', () => {
    const expected = 'someWeirdCased$*String1986FooBarWForWumbo' as const
    const result = toCamelCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toCamelCase(SEPARATORS_TEXT)
    const expected = 'oneTwoThreeFourFiveSixSevenEightNineTen'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})