import { trim } from '../src/trim.js'

describe('trim', () => {
  test('should trim a string at both type level and runtime level', () => {
    const data = ' some nice string '
    const result = trim(data)
    expect(result).toEqual('some nice string')
    type test = Expect<Equal<typeof result, 'some nice string'>>
  })
})
