import type * as Subject from './key-casing'
import * as subject from './key-casing'

namespace TypeTransforms {
  type deepTest = Expect<
    Equal<
      Subject.DeepDelimiterKeys<
        {
          some: { 'deep-nested': { value: true } }
          'other-value': true
        },
        '@'
      >,
      { some: { 'deep@nested': { value: true } }; 'other@value': true }
    >
  >
  type test = Expect<
    Equal<
      Subject.DelimiterKeys<
        {
          'some-value': { 'nested-value': true }
          'other-value': true
        },
        '@'
      >,
      { 'some@value': { 'nested-value': true }; 'other@value': true }
    >
  >
  type deepTest1 = Expect<
    Equal<
      Subject.DeepCamelKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { some: { deepNested: { value: true } }; otherValue: true }
    >
  >
  type test1 = Expect<
    Equal<
      Subject.CamelKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { someValue: { 'deep-nested': true }; otherValue: true }
    >
  >
  type deepTest2 = Expect<
    Equal<
      Subject.DeepSnakeKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { some: { deep_nested: { value: true } }; other_value: true }
    >
  >
  type test2 = Expect<
    Equal<
      Subject.SnakeKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { some_value: { 'deep-nested': true }; other_value: true }
    >
  >
  type deepTest3 = Expect<
    Equal<
      Subject.DeepKebabKeys<{
        some: { deepNested: { value: true } }
        otherValue: true
      }>,
      { some: { 'deep-nested': { value: true } }; 'other-value': true }
    >
  >
  type test3 = Expect<
    Equal<
      Subject.KebabKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { 'some-value': { deepNested: true }; 'other-value': true }
    >
  >
  type deepTest4 = Expect<
    Equal<
      Subject.DeepPascalKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { Some: { DeepNested: { Value: true } }; OtherValue: true }
    >
  >
  type test4 = Expect<
    Equal<
      Subject.PascalKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { SomeValue: { deepNested: true }; OtherValue: true }
    >
  >
  type deepTest5 = Expect<
    Equal<
      Subject.DeepConstantKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { SOME: { DEEP_NESTED: { VALUE: true } }; OTHER_VALUE: true }
    >
  >
  type test5 = Expect<
    Equal<
      Subject.ConstantKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { SOME_VALUE: { deepNested: true }; OTHER_VALUE: true }
    >
  >
}

describe('key transformation', () => {
  test('deepTransformKeys', () => {
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

  test('transformKeys', () => {
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

  test('deepCamelKeys', () => {
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

  test('deepCamelKeys (SCREAMING_SNAKE_CASE)', () => {
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

  test('camelKeys (SCREAMING_SNAKE_CASE)', () => {
    const obj = {
      NODE_ENV: 'development',
    }
    const expected = {
      nodeEnv: 'development',
    }
    const result = subject.camelKeys(obj)
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

  test('deepTransformKeys should handle null properly', () => {
    const expected = null
    const result = subject.deepConstantKeys(null)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('transformKeys should handle null properly', () => {
    const expected = null
    const result = subject.constantKeys(null)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
