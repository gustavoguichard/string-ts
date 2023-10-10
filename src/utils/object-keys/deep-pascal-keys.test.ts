import { type DeepPascalKeys, deepPascalKeys } from './deep-pascal-keys.js'

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
