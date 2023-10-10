import { type DeepKebabKeys, deepKebabKeys } from './deep-kebab-keys.js'

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
