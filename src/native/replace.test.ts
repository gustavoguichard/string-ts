import { type Replace, replace } from './replace.js'

namespace TypeTests {
  type test = Expect<
    Equal<Replace<'some nice string', ' ', '-'>, 'some-nice string'>
  >
}

describe('replace', () => {
  test('should replace chars in a string at both type level and runtime level once', () => {
    const data = 'some nice string'
    const result = replace(data, ' ')
    expect(result).toEqual('somenice string')
    type test = Expect<Equal<typeof result, 'somenice string'>>
  })
  test('should replace chars but not at type level when using RegExp', () => {
    const data = 'some nice string'
    const result = replace(data, /nice /)
    expect(result).toEqual('some string')
    type test = Expect<Equal<typeof result, string>>
  })
})
