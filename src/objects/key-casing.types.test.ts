import type { DelimiterKeys } from './delimiter-keys.js'
import type { CamelKeys } from './camel-keys.js'
import type { SnakeKeys } from './snake-keys.js'
import type { KebabKeys } from './kebab-keys.js'
import type { PascalKeys } from './pascal-keys.js'
import type { ConstantKeys } from './constant-keys.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      DelimiterKeys<
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
      CamelKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { someValue: { 'deep-nested': true }; otherValue: true }
    >
  >
  type test2 = Expect<
    Equal<
      SnakeKeys<{
        'some-value': { 'deep-nested': true }
        'other-value': true
      }>,
      { some_value: { 'deep-nested': true }; other_value: true }
    >
  >
  type test3 = Expect<
    Equal<
      KebabKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { 'some-value': { deepNested: true }; 'other-value': true }
    >
  >
  type test4 = Expect<
    Equal<
      PascalKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { SomeValue: { deepNested: true }; OtherValue: true }
    >
  >
  type test5 = Expect<
    Equal<
      ConstantKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { SOME_VALUE: { deepNested: true }; OTHER_VALUE: true }
    >
  >
}

test('dummy test', () => expect(true).toBe(true))
