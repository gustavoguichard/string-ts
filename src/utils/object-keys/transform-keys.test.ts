import { transformKeys } from './transform-keys.js'

describe('transformKeys', () => {
  test('should shallowly transform the keys of an object', () => {
    const expected = {
      SOME: { 'deep-nested': { value: true } },
      'OTHER-VALUE': true,
    }
    const result = transformKeys(
      {
        some: { 'deep-nested': { value: true } },
        'other-value': true,
      },
      (key) => key.toUpperCase()
    )
    expect(result).toEqual(expected)
  })
})
