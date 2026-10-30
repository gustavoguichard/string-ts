import {
  type EndsWith,
  endsWith,
  endsWithGuard,
  type WhenEndsWith,
} from './ends-with.js'

namespace TypeTests {
  type test1 = Expect<Equal<EndsWith<'abc', 'c'>, true>>
  type test2 = Expect<Equal<EndsWith<string, 'c'>, boolean>>
  type test3 = Expect<Equal<EndsWith<Uppercase<string>, 'c'>, boolean>>
  type test4 = Expect<Equal<EndsWith<'abc', string>, boolean>>
  type test6 = Expect<Equal<EndsWith<'abcde', 'd', 4>, true>>
  type test7 = Expect<Equal<EndsWith<'abcde', 'e', 4>, false>>
  type test8 = Expect<Equal<EndsWith<'abcde', 'e', 6>, true>>
  type test9 = Expect<Equal<EndsWith<'abcde', 'e', -1>, false>>

  // Template strings
  type testTS1 = Expect<Equal<EndsWith<`${string}cba`, 'a'>, true>>
  type testTS2 = Expect<Equal<EndsWith<`${string}abc`, 'a'>, false>>
  type testTS3 = Expect<Equal<EndsWith<`zyx${string}cba`, 'a'>, true>>
  type testTS4 = Expect<Equal<EndsWith<`xyz${string}abc`, 'a'>, false>>
  type testTS5 = Expect<Equal<EndsWith<`abc${string}xyz`, 'c', 3>, true>>
  type testTS6 = Expect<Equal<EndsWith<`abc${string}xyz`, 'c', 4>, boolean>>

  // Union types
  type testUnion1 = Expect<Equal<EndsWith<'abc' | 'xyz', 'c'>, boolean>>
  type testUnion2 = Expect<Equal<EndsWith<'abc' | 'xyzc', 'c'>, true>>
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

namespace GuardTypeTests {
  // keeps the members that end with the search, drops the ones that don't
  type test1 = Expect<Equal<WhenEndsWith<'abc' | 'xyz', 'c'>, 'abc'>>
  type test2 = Expect<
    Equal<WhenEndsWith<'abc' | 'xyzc' | 'def', 'c'>, 'abc' | 'xyzc'>
  >
  // a single non-matching member narrows to `never`
  type test3 = Expect<Equal<WhenEndsWith<'xyz', 'c'>, never>>
  // non-literal members can't be ruled out, so they're kept
  type test4 = Expect<Equal<WhenEndsWith<string, 'c'>, string>>
  type test5 = Expect<Equal<WhenEndsWith<'abc', string>, 'abc'>>
  // honors the position argument
  type test6 = Expect<
    Equal<WhenEndsWith<'abcde' | 'abxde', 'd', 4>, 'abcde' | 'abxde'>
  >
}

describe('endsWithGuard', () => {
  describe('type narrowing', () => {
    test('narrows a union to the members that end with the search', () => {
      const reportType = 'HouseCalendar' as
        | 'HouseCalendar'
        | 'SenateCalendar'
        | 'HouseFirstReading'

      if (endsWithGuard(reportType, 'Calendar')) {
        type test = Expect<
          Equal<typeof reportType, 'HouseCalendar' | 'SenateCalendar'>
        >
        expect(reportType.endsWith('Calendar')).toBe(true)
      } else {
        type test = Expect<Equal<typeof reportType, 'HouseFirstReading'>>
      }
    })
  })

  describe('runtime behavior', () => {
    const text = 'abc'

    test('returns a plain boolean (narrowing trades away the literal)', () => {
      const result = endsWithGuard(text, 'c')
      type test = Expect<Equal<typeof result, boolean>>
      expect(result).toBe(true)
    })
    test('returns false when text does not end with search', () => {
      expect(endsWithGuard(text, 'b')).toBe(false)
    })
    test('honors the position argument', () => {
      expect(endsWithGuard(text, 'b', 2)).toBe(true)
    })
  })
})
