import { type DeepPascalKeys, deepPascalKeys } from './deep-pascal-keys.js'
import { type Dict } from '../../internal/fixtures.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      DeepPascalKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { Some: { DeepNested: { Value: true } }; OtherValue: true }
    >
  >
  type test2 = Expect<Equal<DeepPascalKeys<Dict<string>>, Dict<string>>>
}

test('deepPascalKeys', () => {
  const expected = {
    Some: { DeepNested: { Value: true } },
    OtherValue: true,
  }
  const result = deepPascalKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
