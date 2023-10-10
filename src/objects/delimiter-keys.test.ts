import { delimiterKeys } from './delimiter-keys.js'

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
