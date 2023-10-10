import * as subject from './internals'
import type * as Subject from './internals'

namespace Internals {
  type test = Expect<
    Equal<
      Subject.PascalCaseAll<['one', 'two', 'three']>,
      ['One', 'Two', 'Three']
    >
  >

  type test1 = Expect<
    Equal<
      Subject.Reject<['one', '', 'two', '', 'three'], ''>,
      ['one', 'two', 'three']
    >
  >

  type test2 = Expect<Equal<Subject.DropSuffix<'helloWorld', 'World'>, 'hello'>>

  type test3 = Expect<Equal<Subject.TupleOf<3, ' '>, [' ', ' ', ' ']>>
}

describe('typeOf', () => {
  test('null', () => {
    expect(subject.typeOf(null)).toEqual('null')
  })
  test('object', () => {
    expect(subject.typeOf({})).toEqual('object')
  })
  test('object', () => {
    expect(subject.typeOf(['a', 'b', 'c'])).toEqual('array')
  })
  test('string', () => {
    expect(subject.typeOf('hello')).toEqual('string')
  })
})

describe('pascalCaseAll', () => {
  test('simple', () => {
    const result = subject.pascalCaseAll(['one', 'two', 'three'])
    const expected = ['One', 'Two', 'Three']
    expect(result).toEqual(expected)
  })
})
