import { snakeKeys } from './snake-keys.js'

test('snakeKeys', () => {
  const expected = {
    some: { deepNested: { value: true } },
    other_value: true,
  }
  const result = snakeKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
