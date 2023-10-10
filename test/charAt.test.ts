import { charAt } from '../src/charAt.js'

describe('charAt', () => {
  test('should get the character of a string at the given index in both type and runtime level', () => {
    const data = 'some nice string'
    const result = charAt(data, 5)
    expect(result).toEqual('n')
    type test = Expect<Equal<typeof result, 'n'>>
  })
})
