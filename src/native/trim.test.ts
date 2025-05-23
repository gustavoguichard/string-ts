import { type Trim, trim } from './trim.js'

namespace TypeTests {
  type test1 = Expect<Equal<Trim<' some nice string '>, 'some nice string'>>
  type test2 = Expect<Equal<Trim<string>, string>>
  type test3 = Expect<Equal<Trim<Uppercase<string>>, Uppercase<string>>>
  type test4 = Expect<
    Equal<Trim<` on${Capitalize<string>} `>, `on${Capitalize<string>}`>
  >
}

describe('trim', () => {
  test('should trim a string at both type level and runtime level', () => {
    const data = ' some nice string '
    const result = trim(data)
    expect(result).toEqual('some nice string')
    type test = Expect<Equal<typeof result, 'some nice string'>>
  })
})
