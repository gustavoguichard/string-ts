import { concat } from './concat.js'

describe('concat', () => {
  test('concatenates', () => {
    const result = concat('one', 'two', 'three')
    const expected = 'onetwothree'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
