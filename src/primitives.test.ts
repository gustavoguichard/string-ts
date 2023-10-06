/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as subject from './primitives'

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

  describe('endsWith', () => {
    const text = 'abc'

    describe('without offset', () => {
      test('should return true when text ends with search', () => {
        const result = subject.endsWith(text, 'c')
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when text does not end with search', () => {
        const result = subject.endsWith(text, 'b')
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with offset', () => {
      test('should return true when offset text ends with search', () => {
        const result = subject.endsWith(text, 'b', 2)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return true when offset text ends with search (multi-char)', () => {
        const result = subject.endsWith(text, 'bc', 3)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when offset string does not end with search', () => {
        const result = subject.endsWith(text, 'c', 1)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with bad offset', () => {
      test('should return false when the offset is negative', () => {
        const result = subject.endsWith(text, 'a', -1)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
      test('should return true when the end matches and offset is greater than text length', () => {
        const result = subject.endsWith(text, 'c', 10)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
    })
  })

  describe('includes', () => {
    const text = 'abcde'

    describe('without offset', () => {
      test('should return true when text contains search', () => {
        const result = subject.includes(text, 'bcd')
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when text does not end with search', () => {
        const result = subject.includes(text, 'hello')
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with offset', () => {
      test('should return true when offset text does contain search', () => {
        const result = subject.includes(text, 'c', 1)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return true when offset text does contain search (multi-char)', () => {
        const result = subject.includes(text, 'bcd', 1)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when offset string does not contain search', () => {
        const result = subject.includes(text, 'abc', 3)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with bad offset', () => {
      test('should ignore offset when the offset is negative', () => {
        const result = subject.includes(text, 'a', -100)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when text contains search but offset is greater than text length', () => {
        const result = subject.includes(text, 'c', 10)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
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

  describe('padEnd', () => {
    test('should pad a string at the end', () => {
      const data = 'hello'
      const result = subject.padEnd(data, 10)
      expect(result).toEqual('hello     ')
      type test = Expect<Equal<typeof result, 'hello     '>>
    })

    test('should pad with a given string', () => {
      const data = 'hello'
      const result = subject.padEnd(data, 10, '=>')
      expect(result).toEqual('hello=>=>=')
      type test = Expect<Equal<typeof result, 'hello=>=>='>>
    })

    test('should not pad if no arguments are given', () => {
      const data = 'hello'
      const result = subject.padEnd(data)
      expect(result).toEqual('hello')
      type test = Expect<Equal<typeof result, 'hello'>>
    })

    test('should not pad or truncate if length is shorter than string', () => {
      const data = 'hello'
      const result = subject.padEnd(data, 3, '=')
      expect(result).toEqual('hello')
      type test = Expect<Equal<typeof result, 'hello'>>
    })

    test('should not pad for negative numbers', () => {
      const data = 'hello'
      const result = subject.padEnd(data, -1, '=')
      expect(result).toEqual('hello')
      type test = Expect<Equal<typeof result, 'hello'>>
    })
  })

  describe('padStart', () => {
    test('should pad a string at the start', () => {
      const data = 'hello'
      const result = subject.padStart(data, 10)
      expect(result).toEqual('     hello')
      type test = Expect<Equal<typeof result, '     hello'>>
    })

    test('should pad with a given string', () => {
      const data = 'hello'
      const result = subject.padStart(data, 10, '=>')
      expect(result).toEqual('=>=>=hello')
      type test = Expect<Equal<typeof result, '=>=>=hello'>>
    })

    test('should not pad if no arguments are given', () => {
      const data = 'hello'
      const result = subject.padStart(data)
      expect(result).toEqual('hello')
      type test = Expect<Equal<typeof result, 'hello'>>
    })

    test('should not pad or truncate if length is shorter than string', () => {
      const data = 'hello'
      const result = subject.padStart(data, 3, '=')
      expect(result).toEqual('hello')
      type test = Expect<Equal<typeof result, 'hello'>>
    })

    test('should not pad for negative numbers', () => {
      const data = 'hello'
      const result = subject.padStart(data, -1, '=')
      expect(result).toEqual('hello')
      type test = Expect<Equal<typeof result, 'hello'>>
    })
  })

  describe('repeat', () => {
    test('should repeat the string by a given number of times', () => {
      const data = 'abc'
      const result = subject.repeat(data, 3)
      expect(result).toEqual('abcabcabc')
      type test = Expect<Equal<typeof result, 'abcabcabc'>>
    })

    test('should be empty when repeating 0 times', () => {
      const data = 'abc'
      const result = subject.repeat(data)
      expect(result).toEqual('')
      type test = Expect<Equal<typeof result, ''>>
    })

    test('should throw when trying to repeat with negative number', () => {
      const data = 'abc'
      expect(() => subject.repeat(data, -1)).toThrow()
      type test = Expect<Equal<subject.Repeat<'a', -1>, never>>
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

    test('should allow a negative endIndex', () => {
      const result = subject.slice(str, 0, -5)
      expect(result).toEqual('The quick brown fox jumps over the lazy')
      type test = Expect<
        Equal<typeof result, 'The quick brown fox jumps over the lazy'>
      >
    })

    test('should slice a string from the end with a negative startIndex to a negative endIndex', () => {
      const result = subject.slice(str, -9, -5)
      expect(result).toEqual('lazy')
      type test = Expect<Equal<typeof result, 'lazy'>>
    })

    test('should return an empty string if endIndex is lower than startIndex', () => {
      const result = subject.slice(str, -9, -10)
      expect(result).toEqual('')
      type test = Expect<Equal<typeof result, ''>>

      const result2 = subject.slice(str, 9, 1)
      expect(result2).toEqual('')
      type test2 = Expect<Equal<typeof result2, ''>>
    })
  })

  describe('split', () => {
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

      const result2 = subject.split('', '')
      expect(result2).toEqual([])
      type test2 = Expect<Equal<typeof result2, []>>
    })
  })

  describe('startsWith', () => {
    const text = 'abc'

    describe('without offset', () => {
      test('should return true when text starts with search', () => {
        const result = subject.startsWith(text, 'a')
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when text does not start with search', () => {
        const result = subject.startsWith(text, 'b')
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with offset', () => {
      test('should return true when offset text starts with search', () => {
        const result = subject.startsWith(text, 'b', 1)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when offset string does not start with search', () => {
        const result = subject.startsWith(text, 'a', 1)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })

    describe('with bad offset', () => {
      test('should return true when text starts with search and offset is negative', () => {
        const result = subject.startsWith(text, 'a', -1)
        expect(result).toEqual(true)
        type test = Expect<Equal<typeof result, true>>
      })
      test('should return false when offset is greater than text length', () => {
        const result = subject.startsWith(text, 'a', 10)
        expect(result).toEqual(false)
        type test = Expect<Equal<typeof result, false>>
      })
    })
  })

  describe('trimStart', () => {
    test('should trim the start of a string at both type level and runtime level', () => {
      const data = ' some nice string '
      const result = subject.trimStart(data)
      expect(result).toEqual('some nice string ')
      type test = Expect<Equal<typeof result, 'some nice string '>>
    })
  })

  describe('trimEnd', () => {
    test('should trim the end of a string at both type level and runtime level', () => {
      const data = ' some nice string '
      const result = subject.trimEnd(data)
      expect(result).toEqual(' some nice string')
      type test = Expect<Equal<typeof result, ' some nice string'>>
    })
  })

  describe('trim', () => {
    test('should trim a string at both type level and runtime level', () => {
      const data = ' some nice string '
      const result = subject.trim(data)
      expect(result).toEqual('some nice string')
      type test = Expect<Equal<typeof result, 'some nice string'>>
    })
  })
})
