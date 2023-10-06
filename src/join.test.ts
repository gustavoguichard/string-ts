/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as subject from './join'

describe('join', () => {
  test('should join words in both type level and runtime level', () => {
    const result = subject.join(['a', 'b', 'c'], '-')
    expect(result).toEqual('a-b-c')
    type test = Expect<Equal<typeof result, 'a-b-c'>>
  })

  test('should join only at runtime level when type is wide', () => {
    const data = ['a', 'b', 'c']
    const result = subject.join(data, '-')
    expect(result).toEqual('a-b-c')
    type test = Expect<Equal<typeof result, string>>
  })
})
