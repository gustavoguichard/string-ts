import { type Split, split } from './split.js'

namespace TypeTests {
  type test1 = Expect<
    Equal<Split<'some nice string', ' '>, ['some', 'nice', 'string']>
  >
  type test2 = Expect<Equal<Split<string, ' '>, string[]>>
  type test3 = Expect<Equal<Split<Uppercase<string>, ' '>, string[]>>
  type test4 = Expect<Equal<Split<'some nice string', string>, string[]>>
  type test5 = Expect<Equal<Split<'a-b' | 'c-d', '-'>, ['a', 'b'] | ['c', 'd']>>
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

  test('should preserve trailing empty string when splitting by non-empty delimiter', () => {
    const r1 = split('a,b,', ',')
    expect(r1).toEqual(['a', 'b', ''])
    type t1 = Expect<Equal<typeof r1, ['a', 'b', '']>>

    const r2 = split('a', 'a')
    expect(r2).toEqual(['', ''])
    type t2 = Expect<Equal<typeof r2, ['', '']>>

    const r3 = split('', ',')
    expect(r3).toEqual([''])
    type t3 = Expect<Equal<typeof r3, ['']>>
  })
})
