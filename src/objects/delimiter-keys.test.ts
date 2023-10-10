import { type DelimiterKeys, delimiterKeys } from './delimiter-keys.js'

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
}

test('delimiterKeys', () => {
  const expected = {
    some: { 'deep-nested': { value: true } },
    'other@value': true,
  }
  const result = delimiterKeys(
    {
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    },
    '@',
  )
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
