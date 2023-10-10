import { type Reverse, reverse } from './reverse'

namespace ReverseTests {
  type test1 = Expect<Equal<Reverse<'hello'>, 'olleh'>>
  type test2 = Expect<Equal<Reverse<'123'>, '321'>>
  type test3 = Expect<
    Equal<Reverse<'I love TypeScript!'>, '!tpircSepyT evol I'>
  >
}

describe('reverse', () => {
  test('should reverse a string', () => {
    const expected = '!desrever eb ot eraperp ,dlrow lufituaeb olleH'
    const data = 'Hello beautiful world, prepare to be reversed!'
    const result = reverse(data)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
