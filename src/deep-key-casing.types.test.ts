import type * as Subject from './deep-key-casing'

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

test('dummy test', () => expect(true).toBe(true))
