/* eslint-disable @typescript-eslint/ban-ts-comment */
import type * as Subject from './primitives'
import * as subject from './primitives'

namespace TypeTests {
  type test1 = Expect<
    Equal<Subject.Join<['some', 'nice', 'string'], ' '>, 'some nice string'>
  >
  type test2 = Expect<
    Equal<Subject.Replace<'some nice string', ' ', '-'>, 'some-nice string'>
  >
  type test3 = Expect<
    Equal<Subject.ReplaceAll<'some nice string', ' ', '-'>, 'some-nice-string'>
  >
  type test4 = Expect<
    Equal<Subject.TrimStart<' some nice string '>, 'some nice string '>
  >
  type test5 = Expect<
    Equal<Subject.TrimEnd<' some nice string '>, ' some nice string'>
  >
  type test6 = Expect<
    Equal<Subject.Trim<' some nice string '>, 'some nice string'>
  >
  type test7 = Expect<
    Equal<Subject.Split<'some nice string', ' '>, ['some', 'nice', 'string']>
  >
  type test8 = Expect<Equal<Subject.CharAt<'some nice string', 5>, 'n'>>
  type test9 = Expect<
    Equal<Subject.Slice<'some nice string', 5>, 'nice string'>
  >
  type test10 = Expect<Equal<Subject.Length<'some nice string'>, 16>>

  type test11 = Expect<
    Equal<
      Subject.Concat<['a', 'bc', 'def'] | ['1', '23', '456']>,
      'abcdef' | '123456'
    >
  >

  type test12 = Expect<Equal<Subject.StartsWith<'abc', 'a'>, true>>
  type test13 = Expect<Equal<Subject.EndsWith<'abc', 'c'>, true>>
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('primitives', () => {
  describe('charAt', () => {
    test('should get the character of a string at the given index in both type and runtime level', () => {
      const data = 'some nice string'
      const result = subject.charAt(data, 5)
      expect(result).toEqual('n')
      type test = Expect<Equal<typeof result, 'n'>>
    })
  })

  describe('join', () => {
    test('should join words in both type level and runtime level', () => {
      const result = subject.join(['a', 'b', 'c'], '-')
      expect(result).toEqual('a-b-c')
      type test = Expect<Equal<typeof result, 'a-b-c'>>
    })

    test('should join only at runtime level when type is wide', () => {
      const data = ['a', 'b', 'c']
      const result = subject.join(data, '-')
      expect(result).toEqual('a-b-c')
      type test = Expect<Equal<typeof result, string>>
    })
  })

  describe('length', () => {
    test('should return the lenght of a string at both type level and runtime level', () => {
      const data = 'some nice string'
      const result = subject.length(data)
      expect(result).toEqual(16)
      type test = Expect<Equal<typeof result, 16>>
    })
  })

  test('replace', () => {
    test('should replace chars in a string at both type level and runtime level once', () => {
      const data = 'some nice string'
      const result = subject.replace(data, ' ')
      expect(result).toEqual('somenice string')
      type test = Expect<Equal<typeof result, 'somenice string'>>
    })
  })

  test('replaceAll', () => {
    test('should replace all chars in a string at both type level and runtime level once', () => {
      const data = 'some nice string'
      const result = subject.replaceAll(data, ' ')
      expect(result).toEqual('somenicestring')
      type test = Expect<Equal<typeof result, 'somenicestring'>>
    })

    test('accepts an argument for the replacement', () => {
      const data = 'some nice string'
      const result = subject.replaceAll(data, ' ', '@')
      expect(result).toEqual('some@nice@string')
      type test = Expect<Equal<typeof result, 'some@nice@string'>>
    })
  })

  describe('replaceAll polyfill', () => {
    const replaceAll = String.prototype.replaceAll
    beforeAll(() => {
      // @ts-ignore
      String.prototype.replaceAll = undefined
    })

    afterAll(() => {
      String.prototype.replaceAll = replaceAll
    })
    test('it works through a polyfill', () => {
      const spy = vi.spyOn(String.prototype, 'replace')
      const data = 'some nice string'
      const result = subject.replaceAll(data, ' ', '@')
      expect(result).toEqual('some@nice@string')
      expect(spy).toHaveBeenCalledWith(/ /g, '@')
    })
  })

  describe('slice', () => {
    const str = 'The quick brown fox jumps over the lazy dog.'
    test('should slice a string from a startIndex position', () => {
      const result = subject.slice(str, 31)
      expect(result).toEqual('the lazy dog.')
      type test = Expect<Equal<typeof result, 'the lazy dog.'>>
    })

    test('should slice a string from a startIndex to an endIndex position', () => {
      const result = subject.slice(str, 4, 19)
      expect(result).toEqual('quick brown fox')
      type test = Expect<Equal<typeof result, 'quick brown fox'>>
    })

    test('should slice a string from the end with a negative startIndex', () => {
      const result = subject.slice(str, -4)
      expect(result).toEqual('dog.')
      type test = Expect<Equal<typeof result, 'dog.'>>
    })

    test('should slice a string from the end with a negative startIndex to a negative endIndex', () => {
      const result = subject.slice(str, -9, -5)
      expect(result).toEqual('lazy dog.')
      type test = Expect<Equal<typeof result, 'lazy dog.'>>
      // TODO: figure out how to deal with negative endIndex, this should be the expected result
      // type test = Expect<Equal<typeof result, 'lazy'>>
    })
  })

  test('split', () => {
    test('should split a string by a delimiter into an array of substrings', () => {
      const data = 'some nice string'
      const result = subject.split(data, ' ')
      expect(result).toEqual(['some', 'nice', 'string'])
      type test = Expect<Equal<typeof result, ['some', 'nice', 'string']>>
    })

    test('should no add extra characters when splitting by empty string', () => {
      const data = 'hello'
      const result = subject.split(data, '')
      expect(result).toEqual(['h', 'e', 'l', 'l', 'o'])
      type test = Expect<Equal<typeof result, ['h', 'e', 'l', 'l', 'o']>>

      expect(subject.split('', '')).toEqual([])
      type test2 = Expect<Equal<Subject.Split<''>, []>>
    })
  })

  describe('startsWith', () => {
    describe('without offset', () => {
      test('should return true when text starts with search', () => {
        const result = subject.startsWith('abc', 'a')
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when text does not start with search', () => {
        const result = subject.startsWith('abc', 'b')
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with offset', () => {
      test('should return true when offset text starts with search', () => {
        const result = subject.startsWith('abc', 'b', 1)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when offset string does not start with search', () => {
        const result = subject.startsWith('abc', 'a', 1)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with bad offset', () => {
      test('should return true when text starts with search and offset is negative', () => {
        const result = subject.startsWith('abc', 'a', -1)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when offset is greater than text length', () => {
        const result = subject.startsWith('abc', 'a', 10)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })
  })

  describe('endsWith', () => {
    describe('without offset', () => {
      test('should return true when text ends with search', () => {
        const result = subject.endsWith('abc', 'c')
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when text does not end with search', () => {
        const result = subject.endsWith('abc', 'b')
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with offset', () => {
      test('should return true when offset text ends with search', () => {
        const result = subject.endsWith('abc', 'b', 2)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return true when offset text ends with search (multi-char)', () => {
        const result = subject.endsWith('abc', 'bc', 3)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when offset string does not end with search', () => {
        const result = subject.endsWith('abc', 'c', 1)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with bad offset', () => {
      test('should return false when the offset is negative', () => {
        const result = subject.endsWith('abc', 'a', -1)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
      test('should return true when the end matches and offset is greater than text length', () => {
        const result = subject.endsWith('abc', 'c', 10)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
    })
  })

  test('trimStart', () => {
    test('should trim the start of a string at both type level and runtime level', () => {
      const data = ' some nice string '
      const result = subject.trimStart(data)
      expect(result).toEqual('some nice string ')
      type test = Expect<Equal<typeof result, 'some nice string '>>
    })
  })

  test('trimEnd', () => {
    test('should trim the end of a string at both type level and runtime level', () => {
      const data = ' some nice string '
      const result = subject.trimEnd(data)
      expect(result).toEqual(' some nice string')
      type test = Expect<Equal<typeof result, ' some nice string'>>
    })
  })

  test('trim', () => {
    test('should trim a string at both type level and runtime level', () => {
      const data = ' some nice string '
      const result = subject.trim(data)
      expect(result).toEqual('some nice string')
      type test = Expect<Equal<typeof result, 'some nice string'>>
    })
  })
})
