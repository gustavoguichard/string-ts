import {
  SEPARATORS_TEXT,
  WEIRD_TEXT,
  type WeirdTextUnion,
} from '../../internal/fixtures.js'
import { type PascalCase, pascalCase } from './pascal-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      PascalCase<WeirdTextUnion>,
      | 'SomeWeirdCased$*String1986FooBarWForWumbo'
      | 'WheresTheLeakMaam'
      | 'DontDistributeUnions'
    >
  >
}

describe('pascalCase', () => {
  test('casing functions', () => {
    const expected = 'SomeWeirdCased$*String1986FooBarWForWumbo' as const
    const result = pascalCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = pascalCase(SEPARATORS_TEXT)
    const expected = 'OneTwoThreeFourFiveSixSevenEightNineTen'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
