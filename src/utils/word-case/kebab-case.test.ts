import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../../internal/fixtures.js'
import { type KebabCase, kebabCase } from './kebab-case.js'

namespace TypeTransforms {
  type test1 = Expect<
    Equal<
      KebabCase<WeirdTextUnion>,
      | 'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo'
      | 'dont-distribute-unions'
    >
  >
  type test2 = Expect<Equal<KebabCase<string>, string>>
}

describe('kebabCase', () => {
  test('casing functions', () => {
    const expected =
      'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo' as const
    const result = kebabCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = kebabCase(SEPARATORS_TEXT)
    const expected = 'one-two-three-four-five-six-seven-eight-nine-ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
