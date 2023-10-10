import { deepDelimiterKeys } from './deep-delimiter-keys.js'

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
