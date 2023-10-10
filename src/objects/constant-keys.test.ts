import { constantKeys } from './constant-keys.js'

describe('constantKeys', () => {
  test('should shollowly transform object keys to constant case', () => {
    const expected = {
      SOME: { deepNested: { value: true } },
      OTHER_VALUE: true,
    }
    const result = constantKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('should handle null properly', () => {
    const expected = null
    const result = constantKeys(null)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
