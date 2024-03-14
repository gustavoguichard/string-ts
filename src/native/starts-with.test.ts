import { type StartsWith, startsWith } from './starts-with.js'

namespace TypeTests {
  type test1 = Expect<Equal<StartsWith<'abc', 'a'>, true>>
  type test2 = Expect<Equal<StartsWith<'abc', 'b', 1>, true>>
  type test3 = Expect<Equal<StartsWith<Uppercase<string>, 'a'>, boolean>>
  type test4 = Expect<Equal<StartsWith<string, 'a'>, boolean>>
  type test5 = Expect<Equal<StartsWith<'abc', string>, boolean>>
  type test6 = Expect<Equal<StartsWith<'abc', 'a', number>, boolean>>
  type test7 = Expect<Equal<StartsWith<`abc${string}`, 'a'>, true>>
  type test8 = Expect<Equal<StartsWith<`cba${string}`, 'a'>, false>>
  type test9 = Expect<Equal<StartsWith<`abc${string}`, 'abc'>, true>>
}

describe('startsWith', () => {
  const text = 'abc'

  describe('without offset', () => {
    test('should return true when text starts with search', () => {
      const result = startsWith(text, 'a')
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when text does not start with search', () => {
      const result = startsWith(text, 'b')
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })

  describe('with offset', () => {
    test('should return true when offset text starts with search', () => {
      const result = startsWith(text, 'b', 1)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when offset string does not start with search', () => {
      const result = startsWith(text, 'a', 1)
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })

  describe('with bad offset', () => {
    test('should return true when text starts with search and offset is negative', () => {
      const result = startsWith(text, 'a', -1)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when offset is greater than text length', () => {
      const result = startsWith(text, 'a', 10)
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })
})
