import { type Replace, replace } from './replace.js'

namespace TypeTests {
  type test1 = Expect<
    Equal<Replace<'some nice string', ' ', '-'>, 'some-nice string'>
  >
  type test2 = Expect<Equal<Replace<'some nice string', RegExp, '-'>, string>>
  type test3 = Expect<Equal<Replace<string, ' ', '-'>, string>>
  type test4 = Expect<Equal<Replace<Uppercase<string>, ' ', '-'>, string>>
  type test5 = Expect<Equal<Replace<'some nice string', string, '-'>, string>>
  type test6 = Expect<Equal<Replace<'some nice string', ' ', string>, string>>
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
