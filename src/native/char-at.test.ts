import { type CharAt, charAt } from './char-at.js'

namespace TypeTests {
  type test1 = Expect<Equal<CharAt<'some nice string', 5>, 'n'>>
  type test2 = Expect<Equal<CharAt<string, 5>, string>>
  type test3 = Expect<Equal<CharAt<'some nice string', number>, string>>

  // TODO: index greater than Length<T>
  // type test4 = Expect<Equal<CharAt<'some nice string', 100>, ''>>
}

describe('charAt', () => {
  test('should get the character of a string at the given index in both type and runtime level', () => {
    const data = 'some nice string'
    const result = charAt(data, 5)
    expect(result).toEqual('n')
    type test = Expect<Equal<typeof result, 'n'>>
  })
})
