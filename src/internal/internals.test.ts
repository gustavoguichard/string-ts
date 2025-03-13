import type { DropSuffix, PascalCaseAll, Reject, TupleOf } from './internals.js'
import { pascalCaseAll, typeOf } from './internals.js'

namespace Internals {
  type testPascalCaseAll1 = Expect<
    Equal<PascalCaseAll<['one', 'two', 'three']>, ['One', 'Two', 'Three']>
  >
  type testPascalCaseAll2 = Expect<Equal<PascalCaseAll<string[]>, string[]>>

  type testReject1 = Expect<
    Equal<Reject<['one', '', 'two', '', 'three'], ''>, ['one', 'two', 'three']>
  >

  type testDropSuffix1 = Expect<
    Equal<DropSuffix<'helloWorld', 'World'>, 'hello'>
  >
  type testDropSuffix2 = Expect<Equal<DropSuffix<string, 'World'>, string>>
  type testDropSuffix3 = Expect<Equal<DropSuffix<'helloWorld', string>, string>>

  type testTupleOf1 = Expect<Equal<TupleOf<3, ' '>, [' ', ' ', ' ']>>
}

describe('typeOf', () => {
  test('null', () => {
    expect(typeOf(null)).toEqual('null')
  })
  test('object', () => {
    expect(typeOf({})).toEqual('object')
  })
  test('object', () => {
    expect(typeOf(['a', 'b', 'c'])).toEqual('array')
  })
  test('string', () => {
    expect(typeOf('hello')).toEqual('string')
  })
})

describe('pascalCaseAll', () => {
  test('simple', () => {
    const result = pascalCaseAll(['one', 'two', 'three'])
    const expected = ['One', 'Two', 'Three']
    expect(result).toEqual(expected)
  })
})
