import { type CharAt, charAt } from './char-at.js'

namespace TypeTests {
  type test = Expect<Equal<CharAt<'some nice string', 5>, 'n'>>
}

describe('charAt', () => {
  test('should get the character of a string at the given index in both type and runtime level', () => {
    const data = 'some nice string'
    const result = charAt(data, 5)
    expect(result).toEqual('n')
    type test = Expect<Equal<typeof result, 'n'>>
  })
})
