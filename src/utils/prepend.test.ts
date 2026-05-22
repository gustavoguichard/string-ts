import { type Prepend, prepend } from './prepend.js'

namespace PrependTests {
  type test1 = Expect<Equal<Prepend<'id', 'user_'>, 'user_id'>>
  type test2 = Expect<Equal<Prepend<'world', 'hello '>, 'hello world'>>
  type test3 = Expect<Equal<Prepend<string, 'user_'>, `user_${string}`>>
  type test4 = Expect<Equal<Prepend<'_id', string>, `${string}_id`>>
  type test5 = Expect<Equal<Prepend<'c', 'a' | 'b'>, 'ac' | 'bc'>>
}

describe('prepend', () => {
  test('prepends a prefix', () => {
    const expected = 'user_id' as const
    const result = prepend('id', 'user_')

    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
  
  test('prepends a prefix', () => {
    const expected = 'id_user' as const
    const result = prepend('user', 'id_')

    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
