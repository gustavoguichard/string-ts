import { type PadEnd, padEnd } from './pad-end.js'

namespace TypeTests {
  type test1 = Expect<Equal<PadEnd<'hello', 10, ' '>, 'hello     '>>
  type test2 = Expect<Equal<PadEnd<string, 10, ' '>, string>>
  type test3 = Expect<Equal<PadEnd<'hello', number, ' '>, string>>
  type test4 = Expect<Equal<PadEnd<'hello', 10, string>, string>>
}

describe('padEnd', () => {
  test('should pad a string at the end', () => {
    const data = 'hello'
    const result = padEnd(data, 10)
    expect(result).toEqual('hello     ')
    type test = Expect<Equal<typeof result, 'hello     '>>
  })

  test('should pad with a given string', () => {
    const data = 'hello'
    const result = padEnd(data, 10, '=>')
    expect(result).toEqual('hello=>=>=')
    type test = Expect<Equal<typeof result, 'hello=>=>='>>
  })

  test('should not pad if no arguments are given', () => {
    const data = 'hello'
    const result = padEnd(data)
    expect(result).toEqual('hello')
    type test = Expect<Equal<typeof result, 'hello'>>
  })

  test('should not pad or truncate if length is shorter than string', () => {
    const data = 'hello'
    const result = padEnd(data, 3, '=')
    expect(result).toEqual('hello')
    type test = Expect<Equal<typeof result, 'hello'>>
  })

  test('should not pad for negative numbers', () => {
    const data = 'hello'
    const result = padEnd(data, -1, '=')
    expect(result).toEqual('hello')
    type test = Expect<Equal<typeof result, 'hello'>>
  })
})
