import { trimEnd } from './trim-end.js'

describe('trimEnd', () => {
  test('should trim the end of a string at both type level and runtime level', () => {
    const data = ' some nice string '
    const result = trimEnd(data)
    expect(result).toEqual(' some nice string')
    type test = Expect<Equal<typeof result, ' some nice string'>>
  })
})
