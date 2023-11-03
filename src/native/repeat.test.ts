import { type Repeat, repeat } from './repeat.js'

namespace TypeTests {
  type test1 = Expect<Equal<Repeat<' ', 3>, '   '>>
  type test2 = Expect<Equal<Repeat<string, 3>, string>>
  type test3 = Expect<Equal<Repeat<Uppercase<string>, 3>, string>>
  type test4 = Expect<Equal<Repeat<' ', number>, string>>
}

describe('repeat', () => {
  test('should repeat the string by a given number of times', () => {
    const data = 'abc'
    const result = repeat(data, 3)
    expect(result).toEqual('abcabcabc')
    type test = Expect<Equal<typeof result, 'abcabcabc'>>
  })

  test('should be empty when repeating 0 times', () => {
    const data = 'abc'
    const result = repeat(data)
    expect(result).toEqual('')
    type test = Expect<Equal<typeof result, ''>>
  })

  test('should throw when trying to repeat with negative number', () => {
    const data = 'abc'
    expect(() => repeat(data, -1)).toThrow()
    type test = Expect<Equal<Repeat<'a', -1>, never>>
  })
})
