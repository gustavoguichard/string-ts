import * as subject from './truncate'

describe('truncate', () => {
  test('truncate small sentence does nothing', () => {
    const expected = 'Hello' as const
    const result = subject.truncate('Hello', 9)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate big sentence truncate', () => {
    const expected = 'Hello ...' as const
    const result = subject.truncate('Hello world', 9)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate with negative integer does truncate', () => {
    const expected = '...' as const
    const result = subject.truncate('Hello world', -1)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate big sentence with specified omission', () => {
    const expected = 'Hello[...]' as const
    const result = subject.truncate('Hello world', 10, '[...]')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('truncate small sentence with specified omission', () => {
    const expected = 'Hello' as const
    const result = subject.truncate('Hello', 10, '[...]')
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
