import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../internal/fixtures.js'
import { type SnakeCase, toSnakeCase } from './to-snake-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      SnakeCase<WeirdTextUnion>,
      | 'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo'
      | 'dont_distribute_unions'
    >
  >
}

describe('toSnakeCase', () => {
  test('casing functions', () => {
    const expected =
      'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo' as const
    const result = toSnakeCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toSnakeCase(SEPARATORS_TEXT)
    const expected = 'one_two_three_four_five_six_seven_eight_nine_ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
