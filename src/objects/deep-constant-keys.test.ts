import { deepConstantKeys } from './deep-constant-keys.js'

describe('deepConstantKeys', () => {
  test('should deeply transform object keys to constant case', () => {
    const expected = {
      SOME: { DEEP_NESTED: { VALUE: true } },
      OTHER_VALUE: true,
    }
    const result = deepConstantKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('should handle null properly', () => {
    const expected = null
    const result = deepConstantKeys(null)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
