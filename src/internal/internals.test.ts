import * as subject from './internals'

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
