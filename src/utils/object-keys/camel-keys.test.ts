import { type CamelKeys, camelKeys } from './camel-keys.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      CamelKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { someValue: { 'deep-nested': true }; otherValue: true }
    >
  >
}

test('camelKeys', () => {
  const expected = {
    some: { 'deep-nested': { value: true } },
    otherValue: true,
  }
  const result = camelKeys({
    some: { 'deep-nested': { value: true } },
    'other-value': true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
