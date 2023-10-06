import type * as Subject from './key-casing'

namespace TypeTransforms {
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
  type test1 = Expect<
    Equal<
      Subject.CamelKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { someValue: { 'deep-nested': true }; otherValue: true }
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
  type test3 = Expect<
    Equal<
      Subject.KebabKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { 'some-value': { deepNested: true }; 'other-value': true }
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
