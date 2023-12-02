import {
  type WeirdTextUnion,
  WEIRD_TEXT,
  SEPARATORS_TEXT,
} from '../../internal/fixtures.js'
import { type TitleCase, titleCase } from './title-case.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      TitleCase<WeirdTextUnion>,
      | 'Some Weird Cased $* String 1986 Foo Bar W For Wumbo'
      | 'Wheres The Leak Maam'
      | 'Dont Distribute Unions'
    >
  >
}

describe('titleCase', () => {
  test('casing functions', () => {
    const expected =
      'Some Weird Cased $* String 1986 Foo Bar W For Wumbo' as const
    const result = titleCase(WEIRD_TEXT)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = titleCase(SEPARATORS_TEXT)
    const expected = 'One Two Three Four Five Six Seven Eight Nine Ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
