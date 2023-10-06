import * as subject from './key-casing'

describe('key transformation', () => {
  describe('transformKeys', () => {
    test('should shallowly transform the keys of an object', () => {
      const expected = {
        SOME: { 'deep-nested': { value: true } },
        'OTHER-VALUE': true,
      }
      const result = subject.transformKeys(
        {
          some: { 'deep-nested': { value: true } },
          'other-value': true,
        },
        (key) => key.toUpperCase(),
      )
      expect(result).toEqual(expected)
    })

    test('should handle null properly', () => {
      const expected = null
      const result = subject.constantKeys(null)
      expect(result).toEqual(expected)
      type test = Expect<Equal<typeof result, typeof expected>>
    })
  })

  describe('deepTransformKeys', () => {
    test('should deeply transform the keys of an object', () => {
      const expected = {
        SOME: { 'DEEP-NESTED': { VALUE: true } },
        'OTHER-VALUE': true,
      }
      const result = subject.deepTransformKeys(
        {
          some: { 'deep-nested': { value: true } },
          'other-value': true,
        },
        (key) => key.toUpperCase(),
      )
      expect(result).toEqual(expected)
    })

    test('should handle null properly', () => {
      const expected = null
      const result = subject.deepConstantKeys(null)
      expect(result).toEqual(expected)
      type test = Expect<Equal<typeof result, typeof expected>>
    })
  })

  test('camelKeys', () => {
    const expected = {
      some: { 'deep-nested': { value: true } },
      otherValue: true,
    }
    const result = subject.camelKeys({
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  describe('deepCamelKeys', () => {
    test('should camelize the object', () => {
      const expected = {
        some: { deepNested: { value: true } },
        otherValue: true,
      }
      const result = subject.deepCamelKeys({
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
      const result = subject.deepCamelKeys(obj)
      expect(result).toEqual(expected)
      type test = Expect<Equal<typeof result, typeof expected>>
    })
  })

  test('deepConstantKeys', () => {
    const expected = {
      SOME: { DEEP_NESTED: { VALUE: true } },
      OTHER_VALUE: true,
    }
    const result = subject.deepConstantKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('constantKeys', () => {
    const expected = {
      SOME: { deepNested: { value: true } },
      OTHER_VALUE: true,
    }
    const result = subject.constantKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('delimiterKeys', () => {
    const expected = {
      some: { 'deep-nested': { value: true } },
      'other@value': true,
    }
    const result = subject.delimiterKeys(
      {
        some: { 'deep-nested': { value: true } },
        'other-value': true,
      },
      '@',
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('deepDelimiterKeys', () => {
    const expected = {
      some: { 'deep@nested': { value: true } },
      'other@value': true,
    }
    const result = subject.deepDelimiterKeys(
      {
        some: { 'deep-nested': { value: true } },
        'other-value': true,
      },
      '@',
    )
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('kebabKeys', () => {
    const expected = {
      some: { deepNested: { value: true } },
      'other-value': true,
    }
    const result = subject.kebabKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('deepKebabKeys', () => {
    const expected = {
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    }
    const result = subject.deepKebabKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('pascalKeys', () => {
    const expected = {
      Some: { deepNested: { value: true } },
      OtherValue: true,
    }
    const result = subject.pascalKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('deepPascalKeys', () => {
    const expected = {
      Some: { DeepNested: { Value: true } },
      OtherValue: true,
    }
    const result = subject.deepPascalKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('snakeKeys', () => {
    const expected = {
      some: { deepNested: { value: true } },
      other_value: true,
    }
    const result = subject.snakeKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('deepSnakeKeys', () => {
    const expected = {
      some: { deep_nested: { value: true } },
      other_value: true,
    }
    const result = subject.deepSnakeKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
