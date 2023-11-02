import { type Slice, slice } from './slice.js'

namespace TypeTests {
  type test1 = Expect<Equal<Slice<'some nice string', 5>, 'nice string'>>
  type test2 = Expect<Equal<Slice<'some nice string', 5, 9>, 'nice'>>
  type test3 = Expect<Equal<Slice<string, 5, 9>, string>>
  type test4 = Expect<Equal<Slice<'some nice string', number, 9>, string>>
  type test5 = Expect<Equal<Slice<'some nice string', 5, number>, string>>
}

describe('slice', () => {
  const str = 'The quick brown fox jumps over the lazy dog.'
  test('should slice a string from a startIndex position', () => {
    const result = slice(str, 31)
    expect(result).toEqual('the lazy dog.')
    type test = Expect<Equal<typeof result, 'the lazy dog.'>>
  })

  test('should slice a string from a startIndex to an endIndex position', () => {
    const result = slice(str, 4, 19)
    expect(result).toEqual('quick brown fox')
    type test = Expect<Equal<typeof result, 'quick brown fox'>>
  })

  test('should slice a string from the end with a negative startIndex', () => {
    const result = slice(str, -4)
    expect(result).toEqual('dog.')
    type test = Expect<Equal<typeof result, 'dog.'>>
  })

  test('should allow a negative endIndex', () => {
    const result = slice(str, 0, -5)
    expect(result).toEqual('The quick brown fox jumps over the lazy')
    type test = Expect<
      Equal<typeof result, 'The quick brown fox jumps over the lazy'>
    >
  })

  test('should slice a string from the end with a negative startIndex to a negative endIndex', () => {
    const result = slice(str, -9, -5)
    expect(result).toEqual('lazy')
    type test = Expect<Equal<typeof result, 'lazy'>>
  })

  test('should return an empty string if endIndex is lower than startIndex', () => {
    const result = slice(str, -9, -10)
    expect(result).toEqual('')
    type test = Expect<Equal<typeof result, ''>>

    const result2 = slice(str, 9, 1)
    expect(result2).toEqual('')
    type test2 = Expect<Equal<typeof result2, ''>>
  })
})
