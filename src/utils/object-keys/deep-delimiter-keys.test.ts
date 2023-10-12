import {
  type DeepDelimiterKeys,
  deepDelimiterKeys,
} from './deep-delimiter-keys.js'
import { type Dict } from '../../internal/fixtures.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      DeepDelimiterKeys<
        {
          some: { 'deep-nested': { value: true } }
          'other-value': true
        },
        '@'
      >,
      { some: { 'deep@nested': { value: true } }; 'other@value': true }
    >
  >
  type test2 = Expect<Equal<DeepDelimiterKeys<Dict<string>, '@'>, Dict<string>>>
}

test('deepDelimiterKeys', () => {
  const expected = {
    some: { 'deep@nested': { value: true } },
    'other@value': true,
  }
  const result = deepDelimiterKeys(
    {
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    },
    '@',
  )
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
