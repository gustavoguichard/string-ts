import { type Truncate, truncate } from './truncate.js'

namespace TruncateTests {
  type test1 = Expect<Equal<Truncate<'Hello, world', 9>, 'Hello,...'>>
  type test2 = Expect<Equal<Truncate<'Hello, world', 12>, 'Hello, world'>>
  type test3 = Expect<Equal<Truncate<'Hello, world', 2>, '...'>>
  type test4 = Expect<Equal<Truncate<'Hello, world', 9, '[...]'>, 'Hell[...]'>>
  type test5 = Expect<Equal<Truncate<'Hello, world', -1>, '...'>>
  type test6 = Expect<Equal<Truncate<'Hello, world', 0, '[...]'>, '[...]'>>
  type test7 = Expect<Equal<Truncate<string, 0, '[...]'>, string>>
  type test8 = Expect<Equal<Truncate<Uppercase<string>, 0, '[...]'>, string>>
  type test9 = Expect<Equal<Truncate<'Hello, world', number, '[...]'>, string>>
  type test10 = Expect<Equal<Truncate<'Hello, world', 0, string>, string>>
}

describe('truncate', () => {
  test('truncate small sentence does nothing', () => {
    const expected = 'Hello' as const
    const result = truncate('Hello', 9)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate big sentence truncate', () => {
    const expected = 'Hello ...' as const
    const result = truncate('Hello world', 9)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate with negative integer does truncate', () => {
    const expected = '...' as const
    const result = truncate('Hello world', -1)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate big sentence with specified omission', () => {
    const expected = 'Hello[...]' as const
    const result = truncate('Hello world', 10, '[...]')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate small sentence with specified omission', () => {
    const expected = 'Hello' as const
    const result = truncate('Hello', 10, '[...]')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
