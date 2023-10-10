import { kebabKeys } from './kebab-keys.js'

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
