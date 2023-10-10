import { type TrimEnd, trimEnd } from './trim-end.js'

namespace TypeTests {
  type test = Expect<Equal<TrimEnd<' some nice string '>, ' some nice string'>>
}

describe('trimEnd', () => {
  test('should trim the end of a string at both type level and runtime level', () => {
    const data = ' some nice string '
    const result = trimEnd(data)
    expect(result).toEqual(' some nice string')
    type test = Expect<Equal<typeof result, ' some nice string'>>
  })
})
