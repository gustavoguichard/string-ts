import { type Append, append } from './append.js'

namespace AppendTests {
  type test1 = Expect<Equal<Append<'user', '_id'>, 'user_id'>>
  type test2 = Expect<Equal<Append<'hello', ' world'>, 'hello world'>>
  type test3 = Expect<Equal<Append<string, '_id'>, `${string}_id`>>
  type test4 = Expect<Equal<Append<'user_', string>, `user_${string}`>>
  type test5 = Expect<Equal<Append<'a' | 'b', 'c'>, 'ac' | 'bc'>>
}

describe('append', () => {
  test('appends a suffix', () => {
    const expected = 'user_id' as const
    const result = append('user', '_id')

    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('appends a suffix', () => {
    const expected = 'username' as const
    const result = append('user', 'name')

    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
