import { type Concat, concat } from './concat.js'

namespace TypeTests {
  type test1 = Expect<Equal<Concat<['a', 'bc', 'def']>, 'abcdef'>>
  type test2 = Expect<
    Equal<Concat<['a', 'bc', 'def'] | ['1', '23', '456']>, 'abcdef' | '123456'>
  >
  type test3 = Expect<Equal<Concat<string[]>, string>>
}

describe('concat', () => {
  test('concatenates', () => {
    const result = concat('one', 'two', 'three')
    const expected = 'onetwothree'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
