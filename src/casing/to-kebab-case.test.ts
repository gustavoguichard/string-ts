import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../internal/fixtures.js'
import { type KebabCase, toKebabCase } from './to-kebab-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      KebabCase<WeirdTextUnion>,
      | 'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo'
      | 'dont-distribute-unions'
    >
  >
}

describe('toKebabCase', () => {
  test('casing functions', () => {
    const expected =
      'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo' as const
    const result = toKebabCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toKebabCase(SEPARATORS_TEXT)
    const expected = 'one-two-three-four-five-six-seven-eight-nine-ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
