import type * as Subject from './key-casing'
import * as subject from './key-casing'

namespace TypeTransforms {
  type test = Expect<
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
  type test1 = Expect<
    Equal<
      Subject.DeepCamelKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { some: { deepNested: { value: true } }; otherValue: true }
    >
  >
  type test2 = Expect<
    Equal<
      Subject.DeepSnakeKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { some: { deep_nested: { value: true } }; other_value: true }
    >
  >
  type test3 = Expect<
    Equal<
      Subject.DeepKebabKeys<{
        some: { deepNested: { value: true } }
        otherValue: true
      }>,
      { some: { 'deep-nested': { value: true } }; 'other-value': true }
    >
  >
  type test4 = Expect<
    Equal<
      Subject.DeepPascalKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { Some: { DeepNested: { Value: true } }; OtherValue: true }
    >
  >
  type test5 = Expect<
    Equal<
      Subject.DeepConstantKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { SOME: { DEEP_NESTED: { VALUE: true } }; OTHER_VALUE: true }
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
})
