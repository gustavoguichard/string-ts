import { type ReplaceKeys, replaceKeys } from './replace-keys.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      ReplaceKeys<
        {
          'some-value': { 'deep-nested': true }
          'other-value': true
        },
        'some-',
        ''
      >,
      { value: { 'deep-nested': true }; 'other-value': true }
    >
  >
}

test('replaceKeys', () => {
  const expected = {
    some: { deepNested: { value: true } },
    value: true,
  }
  const result = replaceKeys(
    {
      some: { deepNested: { value: true } },
      other_value: true,
    },
    'other_',
    '',
  )
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
