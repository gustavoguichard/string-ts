import { padEnd } from '../src/padEnd.js'

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
