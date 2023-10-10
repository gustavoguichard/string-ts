import { deepTransformKeys } from './deep-transform-keys.js'

describe('deepTransformKeys', () => {
  test('should deeply transform the keys of an object', () => {
    const expected = {
      SOME: [{ 'DEEP-NESTED': { VALUE: true } }],
      'OTHER-VALUE': true,
    }
    const result = deepTransformKeys(
      {
        some: [{ 'deep-nested': { value: true } }],
        'other-value': true,
      },
      (key) => key.toUpperCase(),
    )
    expect(result).toEqual(expected)
  })
})
