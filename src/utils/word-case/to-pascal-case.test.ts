import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../../internal/fixtures.js'
import { type PascalCase, toPascalCase } from './to-pascal-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      PascalCase<WeirdTextUnion>,
      'SomeWeirdCased$*String1986FooBarWForWumbo' | 'DontDistributeUnions'
    >
  >
}

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
