import { type CamelKeys, camelKeys } from './camel-keys.js'
import { type Dict } from '../../internal/fixtures.js'

namespace TypeTransforms {
  type test1 = Expect<
    Equal<
      CamelKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { someValue: { 'deep-nested': true }; otherValue: true }
    >
  >
  type test2 = Expect<Equal<CamelKeys<Dict<string>>, Dict<string>>>
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
