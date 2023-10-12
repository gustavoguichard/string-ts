import { type Length, length } from './length.js'

namespace TypeTests {
  type test = Expect<Equal<Length<'some nice string'>, 16>>
  type test1 = Expect<Equal<Length<string>, number>>
}

describe('length', () => {
  test('should return the lenght of a string at both type level and runtime level', () => {
    const data = 'some nice string'
    const result = length(data)
    expect(result).toEqual(16)
    type test = Expect<Equal<typeof result, 16>>
  })
})
