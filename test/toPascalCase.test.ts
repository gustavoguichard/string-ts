import { WEIRD_TEXT, SEPARATORS_TEXT } from '../src/fixtures.js'
import { toPascalCase } from '../src/toPascalCase.js'

describe('toPascelCase', () => {
  test('casing functions', () => {
    const expected = 'SomeWeirdCased$*String1986FooBarWForWumbo' as const
    const result = toPascalCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toPascalCase(SEPARATORS_TEXT)
    const expected = 'OneTwoThreeFourFiveSixSevenEightNineTen'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
