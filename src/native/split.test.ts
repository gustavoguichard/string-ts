import { type Split, split } from './split.js'

namespace TypeTests {
  type test = Expect<
    Equal<Split<'some nice string', ' '>, ['some', 'nice', 'string']>
  >
}

describe('split', () => {
  test('should split a string by a delimiter into an array of substrings', () => {
    const data = 'some nice string'
    const result = split(data, ' ')
    expect(result).toEqual(['some', 'nice', 'string'])
    type test = Expect<Equal<typeof result, ['some', 'nice', 'string']>>
  })

  test('should no add extra characters when splitting by empty string', () => {
    const data = 'hello'
    const result = split(data, '')
    expect(result).toEqual(['h', 'e', 'l', 'l', 'o'])
    type test = Expect<Equal<typeof result, ['h', 'e', 'l', 'l', 'o']>>

    const result2 = split('', '')
    expect(result2).toEqual([])
    type test2 = Expect<Equal<typeof result2, []>>
  })
})
