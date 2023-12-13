import { type PadStart, padStart } from './pad-start.js'

namespace TypeTests {
  type test1 = Expect<Equal<PadStart<'hello', 10, ' '>, '     hello'>>
  type test2 = Expect<Equal<PadStart<string, 10, ' '>, string>>
  type test3 = Expect<Equal<PadStart<Uppercase<string>, 10, ' '>, string>>
  type test4 = Expect<Equal<PadStart<'hello', number, ' '>, string>>
  type test5 = Expect<Equal<PadStart<'hello', 10, string>, string>>
}

describe('padStart', () => {
  test('should pad a string at the start', () => {
    const data = 'hello'
    const result = padStart(data, 10)
    expect(result).toEqual('     hello')
    type test = Expect<Equal<typeof result, '     hello'>>
  })

  test('should pad with a given string', () => {
    const data = 'hello'
    const result = padStart(data, 10, '=>')
    expect(result).toEqual('=>=>=hello')
    type test = Expect<Equal<typeof result, '=>=>=hello'>>
  })

  test('should not pad if no arguments are given', () => {
    const data = 'hello'
    const result = padStart(data)
    expect(result).toEqual('hello')
    type test = Expect<Equal<typeof result, 'hello'>>
  })

  test('should not pad or truncate if length is shorter than string', () => {
    const data = 'hello'
    const result = padStart(data, 3, '=')
    expect(result).toEqual('hello')
    type test = Expect<Equal<typeof result, 'hello'>>
  })

  test('should not pad for negative numbers', () => {
    const data = 'hello'
    const result = padStart(data, -1, '=')
    expect(result).toEqual('hello')
    type test = Expect<Equal<typeof result, 'hello'>>
  })
})
