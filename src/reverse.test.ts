import * as subject from './reverse'

describe('reverse', () => {
  test('should reverse a string', () => {
    const data = 'Hello beautiful world, prepare to be reversed!'
    const result = subject.reverse(data)
    expect(result).toEqual('!desrever eb ot eraperp ,dlrow lufituaeb olleH')
    type test = Expect<Equal<typeof result, '!desrever eb ot eraperp ,dlrow lufituaeb olleH'>>
  })
})
