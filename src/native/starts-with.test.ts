import {
  type StartsWith,
  startsWith,
  startsWithGuard,
  type WhenStartsWith,
} from './starts-with.js'

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
  type test10 = Expect<Equal<StartsWith<`abc${string}`, 'b', 1>, true>>
  type test11 = Expect<Equal<StartsWith<'abc' | 'def', 'a'>, boolean>>
  type test12 = Expect<Equal<StartsWith<'abc' | 'axy', 'a'>, true>>
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

namespace GuardTypeTests {
  // keeps the members that start with the search, drops the ones that don't
  type test1 = Expect<Equal<WhenStartsWith<'abc' | 'xyz', 'a'>, 'abc'>>
  type test2 = Expect<
    Equal<WhenStartsWith<'abc' | 'axy' | 'xyz', 'a'>, 'abc' | 'axy'>
  >
  // a single non-matching member narrows to `never`
  type test3 = Expect<Equal<WhenStartsWith<'xyz', 'a'>, never>>
  // non-literal members can't be ruled out, so they're kept
  type test4 = Expect<Equal<WhenStartsWith<string, 'a'>, string>>
  type test5 = Expect<Equal<WhenStartsWith<'abc', string>, 'abc'>>
  // honors the position argument
  type test6 = Expect<
    Equal<WhenStartsWith<'abc' | 'xbc', 'b', 1>, 'abc' | 'xbc'>
  >
}

describe('startsWithGuard', () => {
  describe('type narrowing', () => {
    test('narrows a union to the members that start with the search', () => {
      const reportType = 'HouseCalendar' as
        | 'HouseCalendar'
        | 'HouseFirstReading'
        | 'SenateCalendar'

      if (startsWithGuard(reportType, 'House')) {
        type test = Expect<
          Equal<typeof reportType, 'HouseCalendar' | 'HouseFirstReading'>
        >
        expect(reportType.startsWith('House')).toBe(true)
      } else {
        type test = Expect<Equal<typeof reportType, 'SenateCalendar'>>
      }
    })
  })

  describe('runtime behavior', () => {
    const text = 'abc'

    test('returns a plain boolean (narrowing trades away the literal)', () => {
      const result = startsWithGuard(text, 'a')
      type test = Expect<Equal<typeof result, boolean>>
      expect(result).toBe(true)
    })
    test('returns false when text does not start with search', () => {
      expect(startsWithGuard(text, 'b')).toBe(false)
    })
    test('honors the position argument', () => {
      expect(startsWithGuard(text, 'b', 1)).toBe(true)
    })
  })
})
