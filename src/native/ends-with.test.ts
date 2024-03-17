import { type EndsWith, endsWith } from './ends-with.js'

namespace TypeTests {
  type test1 = Expect<Equal<EndsWith<'abc', 'c'>, true>>
  type test2 = Expect<Equal<EndsWith<string, 'c'>, boolean>>
  type test3 = Expect<Equal<EndsWith<Uppercase<string>, 'c'>, boolean>>
  type test4 = Expect<Equal<EndsWith<'abc', string>, boolean>>
  type test6 = Expect<Equal<EndsWith<'abcde', 'd', 4>, true>>
  type test7 = Expect<Equal<EndsWith<'abcde', 'e', 4>, false>>
  type test8 = Expect<Equal<EndsWith<'abcde', 'e', 6>, true>>
  type test9 = Expect<Equal<EndsWith<'abcde', 'e', -1>, false>>

  // // Template strings
  type testTS1 = Expect<Equal<EndsWith<`${string}cba`, 'a'>, true>>
  type testTS2 = Expect<Equal<EndsWith<`${string}abc`, 'a'>, false>>
  type testTS3 = Expect<Equal<EndsWith<`zyx${string}cba`, 'a'>, true>>
  type testTS4 = Expect<Equal<EndsWith<`xyz${string}abc`, 'a'>, false>>
  type testTS5 = Expect<Equal<EndsWith<`abc${string}xyz`, 'c', 3>, true>>
  type testTS6 = Expect<Equal<EndsWith<`abc${string}xyz`, 'c', 4>, boolean>>
}

describe('endsWith', () => {
  const text = 'abc'

  describe('without offset', () => {
    test('should return true when text ends with search', () => {
      const result = endsWith(text, 'c')
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when text does not end with search', () => {
      const result = endsWith(text, 'b')
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })

  describe('with offset', () => {
    test('should return true when offset text ends with search', () => {
      const result = endsWith(text, 'b', 2)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return true when offset text ends with search (multi-char)', () => {
      const result = endsWith(text, 'bc', 3)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when offset string does not end with search', () => {
      const result = endsWith(text, 'c', 1)
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })

  describe('with bad offset', () => {
    test('should return false when the offset is negative', () => {
      const result = endsWith(text, 'a', -1)
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
    test('should return true when the end matches and offset is greater than text length', () => {
      const result = endsWith(text, 'c', 10)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
  })
})
