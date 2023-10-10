import { camelKeys } from './camel-keys.js'

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
