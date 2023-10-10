import { deepPascalKeys } from './deep-pascal-keys.js'

test('deepPascalKeys', () => {
  const expected = {
    Some: { DeepNested: { Value: true } },
    OtherValue: true,
  }
  const result = deepPascalKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
