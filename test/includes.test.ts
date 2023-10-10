import { includes } from '../src/includes.js'

describe('includes', () => {
  const text = 'abcde'

  describe('without offset', () => {
    test('should return true when text contains search', () => {
      const result = includes(text, 'bcd')
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when text does not end with search', () => {
      const result = includes(text, 'hello')
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })

  describe('with offset', () => {
    test('should return true when offset text does contain search', () => {
      const result = includes(text, 'c', 1)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return true when offset text does contain search (multi-char)', () => {
      const result = includes(text, 'bcd', 1)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when offset string does not contain search', () => {
      const result = includes(text, 'abc', 3)
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })

  describe('with bad offset', () => {
    test('should ignore offset when the offset is negative', () => {
      const result = includes(text, 'a', -100)
      expect(result).toEqual(true)
      type test = Expect<Equal<typeof result, true>>
    })
    test('should return false when text contains search but offset is greater than text length', () => {
      const result = includes(text, 'c', 10)
      expect(result).toEqual(false)
      type test = Expect<Equal<typeof result, false>>
    })
  })
})
