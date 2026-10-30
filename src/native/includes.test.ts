import {
  type Includes,
  includes,
  includesGuard,
  type WhenIncludes,
} from './includes.js'

namespace TypeTests {
  type test1 = Expect<Equal<Includes<'abcde', 'bcd'>, true>>
  type test2 = Expect<Equal<Includes<string, 'bcd'>, boolean>>
  type test3 = Expect<Equal<Includes<'abcde', string>, boolean>>
  type test4 = Expect<Equal<Includes<'abcde' | 'xyz', 'bcd'>, boolean>>
  type test5 = Expect<Equal<Includes<'abcde' | 'xbcdy', 'bcd'>, true>>
}

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

namespace GuardTypeTests {
  // keeps the members that contain the search, drops the ones that don't
  type test1 = Expect<Equal<WhenIncludes<'abcde' | 'xyz', 'bcd'>, 'abcde'>>
  type test2 = Expect<
    Equal<WhenIncludes<'abcde' | 'xbcdy' | 'xyz', 'bcd'>, 'abcde' | 'xbcdy'>
  >
  // a single non-matching member narrows to `never`
  type test3 = Expect<Equal<WhenIncludes<'xyz', 'bcd'>, never>>
  // non-literal members can't be ruled out, so they're kept
  type test4 = Expect<Equal<WhenIncludes<string, 'bcd'>, string>>
  type test5 = Expect<Equal<WhenIncludes<'abcde', string>, 'abcde'>>
  // honors the position argument
  type test6 = Expect<Equal<WhenIncludes<'abcde', 'a', 1>, never>>
  type test7 = Expect<Equal<WhenIncludes<'abcde', 'c', 1>, 'abcde'>>
}

describe('includesGuard', () => {
  describe('type narrowing', () => {
    test('narrows a union to the members that contain the search', () => {
      const reportType = 'HouseCalendar' as
        | 'HouseCalendar'
        | 'SenateCalendar'
        | 'HouseFirstReading'
        | 'CurrentStatus'

      if (includesGuard(reportType, 'Calendar')) {
        type test = Expect<
          Equal<typeof reportType, 'HouseCalendar' | 'SenateCalendar'>
        >
        expect(reportType.includes('Calendar')).toBe(true)
      } else {
        type test = Expect<
          Equal<typeof reportType, 'HouseFirstReading' | 'CurrentStatus'>
        >
      }
    })
  })

  describe('runtime behavior', () => {
    const text = 'abcde'

    test('returns a plain boolean (narrowing trades away the literal)', () => {
      const result = includesGuard(text, 'bcd')
      type test = Expect<Equal<typeof result, boolean>>
      expect(result).toBe(true)
    })
    test('returns false when text does not contain search', () => {
      expect(includesGuard(text, 'xyz')).toBe(false)
    })
    test('honors the position argument', () => {
      expect(includesGuard(text, 'a', 1)).toBe(false)
      expect(includesGuard(text, 'c', 1)).toBe(true)
    })
  })
})
