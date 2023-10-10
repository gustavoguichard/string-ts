import { type KebabKeys, kebabKeys } from './kebab-keys.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      KebabKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { 'some-value': { deepNested: true }; 'other-value': true }
    >
  >
}

test('kebabKeys', () => {
  const expected = {
    some: { deepNested: { value: true } },
    'other-value': true,
  }
  const result = kebabKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
