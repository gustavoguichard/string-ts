import { type DeepSnakeKeys, deepSnakeKeys } from './deep-snake-keys.js'
import { type Dict } from '../../internal/fixtures.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      DeepSnakeKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { some: { deep_nested: { value: true } }; other_value: true }
    >
  >
  type test2 = Expect<Equal<DeepSnakeKeys<Dict<string>>, Dict<string>>>
}

test('deepSnakeKeys', () => {
  const expected = {
    some: { deep_nested: { value: true } },
    other_value: true,
  }
  const result = deepSnakeKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
