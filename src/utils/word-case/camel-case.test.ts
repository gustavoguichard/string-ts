import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../../internal/fixtures.js'
import { type CamelCase, camelCase } from './camel-case.js'

namespace TypeTransforms {
  type test1 = Expect<
    Equal<
      CamelCase<WeirdTextUnion>,
      'someWeirdCased$*String1986FooBarWForWumbo' | 'dontDistributeUnions'
    >
  >
  type test2 = Expect<Equal<CamelCase<string>, Uncapitalize<string>>>
}

describe('camelCase', () => {
  test('casing functions', () => {
    const expected = 'someWeirdCased$*String1986FooBarWForWumbo' as const
    const result = camelCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = camelCase(SEPARATORS_TEXT)
    const expected = 'oneTwoThreeFourFiveSixSevenEightNineTen'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
