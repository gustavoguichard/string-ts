import { deepKebabKeys } from './deep-kebab-keys.js'

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
