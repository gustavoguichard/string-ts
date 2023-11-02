import { type TrimStart, trimStart } from './trim-start.js'

namespace TypeTests {
  type test1 = Expect<
    Equal<TrimStart<' some nice string '>, 'some nice string '>
  >
  type test2 = Expect<Equal<TrimStart<string>, string>>
}

describe('trimStart', () => {
  test('should trim the start of a string at both type level and runtime level', () => {
    const data = ' some nice string '
    const result = trimStart(data)
    expect(result).toEqual('some nice string ')
    type test = Expect<Equal<typeof result, 'some nice string '>>
  })
})
