import { pascalKeys } from './pascal-keys.js'

test('pascalKeys', () => {
  const expected = {
    Some: { deepNested: { value: true } },
    OtherValue: true,
  }
  const result = pascalKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
