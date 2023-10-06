import type * as Subject from './key-casing'

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

test('dummy test', () => expect(true).toBe(true))
