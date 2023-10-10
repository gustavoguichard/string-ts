import { WEIRD_TEXT, SEPARATORS_TEXT } from '../internal/fixtures.js'
import { toDelimiterCase } from './to-delimiter-case.js'

describe('toDelimiterCase', () => {
  test('casing functions', () => {
    const expected =
      'some@Weird@cased@$*@String@1986@Foo@Bar@W@FOR@WUMBO' as const
    const result = toDelimiterCase(WEIRD_TEXT, '@')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  test('with various separators', () => {
    const result = toDelimiterCase(SEPARATORS_TEXT, '.')
    const expected = 'one.two.three.four.five.six.seven.eight.nine.ten'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
