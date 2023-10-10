import { type SnakeKeys, snakeKeys } from './snake-keys.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      SnakeKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { some_value: { 'deep-nested': true }; other_value: true }
    >
  >
}

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
