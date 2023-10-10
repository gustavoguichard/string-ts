import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../internal/fixtures.js'
import { type CamelCase, toCamelCase } from './to-camel-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      CamelCase<WeirdTextUnion>,
      'someWeirdCased$*String1986FooBarWForWumbo' | 'dontDistributeUnions'
    >
  >
}

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
