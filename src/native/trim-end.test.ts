import { type TrimEnd, trimEnd } from './trim-end.js'

namespace TypeTests {
  type test1 = Expect<Equal<TrimEnd<' some nice string '>, ' some nice string'>>
  type test2 = Expect<Equal<TrimEnd<string>, string>>
  type test3 = Expect<Equal<TrimEnd<Uppercase<string>>, Uppercase<string>>>
  type test4 = Expect<
    Equal<TrimEnd<`on${Capitalize<string>} `>, `on${Capitalize<string>}`>
  >
  type test5 = Expect<Equal<TrimEnd<`hey, ${string}  `>, `hey, ${string}`>>
}

describe('trimEnd', () => {
  test('should trim the end of a string at both type level and runtime level', () => {
    const data = ' some nice string '
    const result = trimEnd(data)
    expect(result).toEqual(' some nice string')
    type test = Expect<Equal<typeof result, ' some nice string'>>
  })
})
