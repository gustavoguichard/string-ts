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
  type test7 = Expect<Equal<Replace<'a-b' | 'c-d', '-', '='>, 'a=b' | 'c=d'>>
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

  test('should interpret $ replacement patterns at both type and runtime level', () => {
    const r1 = replace('price: X', 'X', '$&5')
    expect(r1).toEqual('price: X5')
    type t1 = Expect<Equal<typeof r1, 'price: X5'>>

    const r2 = replace('a-b', '-', '$$')
    expect(r2).toEqual('a$b')
    type t2 = Expect<Equal<typeof r2, 'a$b'>>

    const r3 = replace('a-b', '-', '$$&')
    expect(r3).toEqual('a$&b')
    type t3 = Expect<Equal<typeof r3, 'a$&b'>>

    const r4 = replace('a-b', '-', '$`')
    expect(r4).toEqual('aab')
    type t4 = Expect<Equal<typeof r4, 'aab'>>

    const r5 = replace('a-b', '-', "$'")
    expect(r5).toEqual('abb')
    type t5 = Expect<Equal<typeof r5, 'abb'>>
  })
})
