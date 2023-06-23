import type * as Subject from './key-casing'
import * as subject from './key-casing'

namespace TypeTransforms {
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
    const result = subject.deepTransformKeys(
      {
        some: { 'deep-nested': { value: true } },
        'other-value': true,
      },
      (key) => key.toUpperCase(),
    )
    expect(result).toEqual({
      SOME: { 'DEEP-NESTED': { VALUE: true } },
      'OTHER-VALUE': true,
    })
  })

  test('deepCamelKeys', () => {
    const result = subject.deepCamelKeys({
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    })
    expect(result).toEqual({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    type test = Expect<
      Equal<
        typeof result,
        { some: { deepNested: { value: boolean } }; otherValue: boolean }
      >
    >
  })

  test('deepSnakeKeys', () => {
    const result = subject.deepSnakeKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual({
      some: { deep_nested: { value: true } },
      other_value: true,
    })
    type test = Expect<
      Equal<
        typeof result,
        { some: { deep_nested: { value: boolean } }; other_value: boolean }
      >
    >
  })

  test('deepKebabKeys', () => {
    const result = subject.deepKebabKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual({
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    })
    type test = Expect<
      Equal<
        typeof result,
        { some: { 'deep-nested': { value: boolean } }; 'other-value': boolean }
      >
    >
  })

  test('deepPascalKeys', () => {
    const result = subject.deepPascalKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual({
      Some: { DeepNested: { Value: true } },
      OtherValue: true,
    })
    type test = Expect<
      Equal<
        typeof result,
        { Some: { DeepNested: { Value: boolean } }; OtherValue: boolean }
      >
    >
  })

  test('deepConstantKeys', () => {
    const result = subject.deepConstantKeys({
      some: { deepNested: { value: true } },
      otherValue: true,
    })
    expect(result).toEqual({
      SOME: { DEEP_NESTED: { VALUE: true } },
      OTHER_VALUE: true,
    })
    type test = Expect<
      Equal<
        typeof result,
        { SOME: { DEEP_NESTED: { VALUE: boolean } }; OTHER_VALUE: boolean }
      >
    >
  })
})
