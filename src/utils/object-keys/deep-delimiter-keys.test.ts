import {
  type DeepDelimiterKeys,
  deepDelimiterKeys,
} from './deep-delimiter-keys.js'

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
}

test('deepDelimiterKeys', () => {
  const expected = {
    some: { 'deep@nested': { value: true } },
    'other@value': true,
  }
  const result = deepDelimiterKeys(
    {
      some: { 'deep-nested': { value: true } },
      'other-value': true,
    },
    '@',
  )
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
