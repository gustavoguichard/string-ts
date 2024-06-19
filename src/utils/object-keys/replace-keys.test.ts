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
  type testWithUnion = Expect<
    Equal<
      ReplaceKeys<Record<'foo' | 'bar', string>, 'oo', 'izz'>,
      Record<'fizz' | 'bar', string>
    >
  >
  type test2 = Expect<
    Equal<
      ReplaceKeys<Record<'some nice string', string>, RegExp, '-'>,
      Record<string, string>
    >
  >
  type test3 = Expect<
    Equal<ReplaceKeys<Record<string, string>, ' ', '-'>, Record<string, string>>
  >
  type test4 = Expect<
    Equal<
      ReplaceKeys<Record<Uppercase<string>, string>, ' ', '-'>,
      Record<string, string>
    >
  >
  type test5 = Expect<
    Equal<
      ReplaceKeys<Record<'some nice string', string>, string, '-'>,
      Record<string, string>
    >
  >
  type test6 = Expect<
    Equal<
      ReplaceKeys<Record<'some nice string', string>, ' ', string>,
      Record<string, string>
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
