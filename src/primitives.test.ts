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
}

describe('primitives', () => {
  describe('join', () => {
    test('should join words in both type level and runtime level', () => {
      const data: ['a', 'b', 'c'] = ['a', 'b', 'c']
      const result = subject.join(data, '-')
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
  })
})
