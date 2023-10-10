import { type StartsWith, startsWith } from './starts-with.js'

namespace TypeTests {
  type test = Expect<Equal<StartsWith<'abc', 'a'>, true>>
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
