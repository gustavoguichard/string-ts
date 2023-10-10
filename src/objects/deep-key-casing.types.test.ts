import type { DeepDelimiterKeys } from './deep-delimiter-keys.js'
import type { DeepCamelKeys } from './deep-camel-keys.js'
import type { DeepSnakeKeys } from './deep-snake-keys.js'
import type { DeepKebabKeys } from './deep-kebab-keys.js'
import type { DeepPascalKeys } from './deep-pascal-keys.js'
import type { DeepConstantKeys } from './deep-constant-keys.js'
namespace TypeTransforms {
  type test = Expect<
    Equal<
      DeepDelimiterKeys<
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
      DeepCamelKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { some: { deepNested: { value: true } }; otherValue: true }
    >
  >
  type test2 = Expect<
    Equal<
      DeepSnakeKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { some: { deep_nested: { value: true } }; other_value: true }
    >
  >
  type test3 = Expect<
    Equal<
      DeepKebabKeys<{
        some: { deepNested: { value: true } }
        otherValue: true
      }>,
      { some: { 'deep-nested': { value: true } }; 'other-value': true }
    >
  >
  type test4 = Expect<
    Equal<
      DeepPascalKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { Some: { DeepNested: { Value: true } }; OtherValue: true }
    >
  >
  type test5 = Expect<
    Equal<
      DeepConstantKeys<{
        some: { 'deep-nested': { value: true } }
        'other-value': true
      }>,
      { SOME: { DEEP_NESTED: { VALUE: true } }; OTHER_VALUE: true }
    >
  >
}

test('dummy test', () => expect(true).toBe(true))
