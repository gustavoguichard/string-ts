import { type DeepKebabKeys, deepKebabKeys } from './deep-kebab-keys.js'
import { type Dict } from '../../internal/fixtures.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      DeepKebabKeys<{
        some: { deepNested: { value: true } }
        otherValue: true
      }>,
      { some: { 'deep-nested': { value: true } }; 'other-value': true }
    >
  >
  type test2 = Expect<Equal<DeepKebabKeys<Dict<string>>, Dict<string>>>
}

test('deepKebabKeys', () => {
  const expected = {
    some: { 'deep-nested': { value: true } },
    'other-value': true,
  }
  const result = deepKebabKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
