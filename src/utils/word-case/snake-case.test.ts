import {
  SEPARATORS_TEXT,
  WEIRD_TEXT,
  type WeirdTextUnion,
} from '../../internal/fixtures.js'
import { type SnakeCase, snakeCase } from './snake-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      SnakeCase<WeirdTextUnion>,
      | 'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo'
      | 'wheres_the_leak_maam'
      | 'dont_distribute_unions'
    >
  >
}

describe('snakeCase', () => {
  test('casing functions', () => {
    const expected =
      'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo' as const
    const result = snakeCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = snakeCase(SEPARATORS_TEXT)
    const expected = 'one_two_three_four_five_six_seven_eight_nine_ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
