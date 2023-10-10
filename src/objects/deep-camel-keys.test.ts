import { deepCamelKeys } from './deep-camel-keys.js'

describe('deepCamelKeys', () => {
  test('should camelize the object', () => {
    const expected = {
      some: { deepNested: { value: true } },
      otherValue: true,
    }
    const result = deepCamelKeys({
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('should camelize from SCREAMING_SNAKE_CASE', () => {
    const obj = {
      NODE_ENV: 'development',
    }
    const expected = {
      nodeEnv: 'development',
    }
    const result = deepCamelKeys(obj)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
